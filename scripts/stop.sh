#!/usr/bin/env bash
set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RUNTIME_DIR="$ROOT_DIR/.runtime"
MODE="${1:-local}"
SERVICE="${2:-web}"

fail() { printf 'Error: %s\n' "$*" >&2; exit 1; }
need() { command -v "$1" >/dev/null 2>&1 || fail "'$1' is required. $2"; }
pid_file() { printf '%s/%s.pid\n' "$RUNTIME_DIR" "$1"; }

usage() {
  cat <<'EOF'
Usage: ./scripts/stop.sh [local|docker] [web|auth|api|db|all]

Defaults to: local web
EOF
}

stop_local_process() {
  local name="$1" expected="$2" file pid command_line pgid signal_target
  file="$(pid_file "$name")"
  [[ -f "$file" ]] || { printf '%s is not tracked as running.\n' "$name"; return; }
  pid="$(<"$file")"
  [[ "$pid" =~ ^[0-9]+$ ]] || { rm -f "$file"; return; }
  kill -0 "$pid" 2>/dev/null || { rm -f "$file"; printf '%s is already stopped.\n' "$name"; return; }
  command_line="$(ps -p "$pid" -o args= 2>/dev/null || true)"
  [[ "$command_line" == *"$expected"* ]] || fail "Refusing to stop PID $pid: it no longer looks like the tracked $name process."
  printf 'Stopping %s (PID %s)…\n' "$name" "$pid"
  pgid="$(ps -p "$pid" -o pgid= 2>/dev/null | tr -d ' ')"
  signal_target="$pid"
  [[ "$pgid" == "$pid" ]] && signal_target="-$pid"
  kill -TERM -- "$signal_target"
  for _ in {1..20}; do
    kill -0 "$pid" 2>/dev/null || break
    sleep 0.1
  done
  if kill -0 "$pid" 2>/dev/null; then
    printf '%s did not exit after two seconds; sending SIGKILL.\n' "$name" >&2
    kill -KILL -- "$signal_target"
  fi
  rm -f "$file"
}

stop_local() {
  case "$SERVICE" in
    web|auth) stop_local_process "$SERVICE" pnpm ;;
    api) stop_local_process api uvicorn ;;
    db) fail "The local script does not own your PostgreSQL service; stop it with your OS service manager." ;;
    all)
      stop_local_process all pnpm
      stop_local_process api uvicorn
      ;;
    *) usage; fail "Unknown service target: $SERVICE" ;;
  esac
}

stop_docker() {
  need docker "Install Docker Desktop / Docker Engine to stop Compose services."
  docker compose version >/dev/null 2>&1 || fail "Docker Compose v2 is required."
  cd "$ROOT_DIR"
  case "$SERVICE" in
    web|auth) exec docker compose stop "$SERVICE" ;;
    api) exec docker compose stop api postgres ;;
    db) exec docker compose stop postgres ;;
    all) exec docker compose --profile tools down --remove-orphans ;;
    *) usage; fail "Unknown service target: $SERVICE" ;;
  esac
}

[[ "$MODE" != "--help" && "$MODE" != "-h" ]] || { usage; exit 0; }
case "$MODE" in
  local) stop_local ;;
  docker) stop_docker ;;
  *) usage; fail "Unknown mode: $MODE" ;;
esac
