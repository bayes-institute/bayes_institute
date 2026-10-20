#!/usr/bin/env bash
set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RUNTIME_DIR="$ROOT_DIR/.runtime"
API_DIR="$ROOT_DIR/server/services/api"
MODE="${1:-local}"
SERVICE="${2:-web}"
TOOLS="${3:-}"

fail() { printf 'Error: %s\n' "$*" >&2; exit 1; }
need() { command -v "$1" >/dev/null 2>&1 || fail "'$1' is required. $2"; }

pid_file() { printf '%s/%s.pid\n' "$RUNTIME_DIR" "$1"; }

ensure_not_running() {
  local file pid
  file="$(pid_file "$1")"
  [[ -f "$file" ]] || return 0
  pid="$(<"$file")"
  [[ "$pid" =~ ^[0-9]+$ ]] && kill -0 "$pid" 2>/dev/null && fail "'$1' is already running (PID $pid). Use ./scripts/stop.sh local $1 first."
  rm -f "$file"
}

start_background() {
  local name="$1"
  shift
  mkdir -p "$RUNTIME_DIR"
  ensure_not_running "$name"
  if command -v setsid >/dev/null 2>&1; then
    setsid "$@" &
  else
    "$@" &
  fi
  LAST_PID=$!
  printf '%s\n' "$LAST_PID" > "$(pid_file "$name")"
}

stop_background() {
  local file pid pgid
  file="$(pid_file "$1")"
  [[ -f "$file" ]] || return 0
  pid="$(<"$file")"
  if [[ "$pid" =~ ^[0-9]+$ ]] && kill -0 "$pid" 2>/dev/null; then
    pgid="$(ps -p "$pid" -o pgid= 2>/dev/null | tr -d ' ')"
    if [[ "$pgid" == "$pid" ]]; then
      kill -TERM -- "-$pid" 2>/dev/null || true
    else
      kill -TERM "$pid" 2>/dev/null || true
    fi
  fi
  rm -f "$file"
}

usage() {
  cat <<'EOF'
Usage: ./scripts/start.sh [local|docker] [web|auth|api|db|all] [--tools]

Defaults to: local web

web/auth  Start one Next.js app only.
api       Start FastAPI and its required PostgreSQL database.
db        Start PostgreSQL only (Docker mode only).
all       Start web, auth, API, and PostgreSQL. Add --tools for pgAdmin.
EOF
}

load_env() {
  if [[ ! -f "$ROOT_DIR/.env" ]]; then
    fail "Create .env first: cp .env.example .env"
  fi
  set -a
  # .env is intentionally a simple KEY=VALUE development file.
  source "$ROOT_DIR/.env"
  set +a
}

check_node() {
  need node "Install Node.js 22 or newer."
  need pnpm "Enable Corepack or install pnpm 11 or newer."
  local node_major
  node_major="$(node -p 'process.versions.node.split(".")[0]')"
  [[ "$node_major" -ge 22 ]] || fail "Node.js 22+ is required; found $(node --version)."
}

check_python() {
  need python3 "Install Python 3.12 or newer."
  local python_version
  python_version="$(python3 -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')"
  [[ "${python_version%%.*}" -gt 3 || "${python_version#*.}" -ge 12 ]] || fail "Python 3.12+ is required; found $python_version."
}

install_client() {
  check_node
  cd "$ROOT_DIR"
  pnpm install --frozen-lockfile
}

prepare_api() {
  load_env
  check_python
  need pg_isready "Install PostgreSQL 16+ locally, start it, then rerun this command."
  local postgres_url="${DATABASE_URL/postgresql+asyncpg/postgresql}"
  pg_isready -d "$postgres_url" >/dev/null || fail "PostgreSQL is not ready at DATABASE_URL."

  local venv="$API_DIR/.venv"
  [[ -x "$venv/bin/python" ]] || python3 -m venv "$venv"
  "$venv/bin/python" -m pip install --upgrade pip
  "$venv/bin/python" -m pip install -e "$API_DIR[dev]"
}

run_api() {
  (
    cd "$API_DIR"
    exec "$API_DIR/.venv/bin/python" -m uvicorn app.main:app --reload --port 8000
  )
}

start_local() {
  case "$SERVICE" in
    web|auth)
      install_client
      start_background "$SERVICE" pnpm --filter "@bayes/${SERVICE}" dev
      trap 'stop_background "$SERVICE"' EXIT INT TERM
      wait "$LAST_PID"
      ;;
    api)
      prepare_api
      start_background api run_api
      trap 'stop_background api' EXIT INT TERM
      wait "$LAST_PID"
      ;;
    db)
      fail "The local script cannot provision PostgreSQL. Start your installed PostgreSQL service, then use 'local api' or 'local all'."
      ;;
    all)
      install_client
      prepare_api
      start_background api run_api
      start_background all pnpm dev
      local client_pid="$LAST_PID"
      trap 'stop_background all; stop_background api' EXIT INT TERM
      wait "$client_pid"
      ;;
    *) usage; fail "Unknown service target: $SERVICE" ;;
  esac
}

start_docker() {
  need docker "Install Docker Desktop / Docker Engine, or use './scripts/start.sh local'."
  docker compose version >/dev/null 2>&1 || fail "Docker Compose v2 is required."
  cd "$ROOT_DIR"

  local profile=()
  [[ "$TOOLS" == "--tools" ]] && profile=(--profile tools)
  [[ -z "$TOOLS" || "$TOOLS" == "--tools" ]] || { usage; fail "Unknown option: $TOOLS"; }

  case "$SERVICE" in
    web|auth|api)
      exec docker compose "${profile[@]}" up --build "$SERVICE"
      ;;
    db)
      [[ -z "$TOOLS" ]] || fail "pgAdmin is only available with the 'all' target."
      exec docker compose up postgres
      ;;
    all)
      exec docker compose "${profile[@]}" up --build
      ;;
    *) usage; fail "Unknown service target: $SERVICE" ;;
  esac
}

[[ "$MODE" != "--help" && "$MODE" != "-h" ]] || { usage; exit 0; }
case "$MODE" in
  local) start_local ;;
  docker) start_docker ;;
  *) usage; fail "Unknown mode: $MODE" ;;
esac
