# Development guide

## Start only what you need

Create your local configuration once:

```bash
cp .env.example .env
```

The default target is `web`, so landing-page work does not start the API, PostgreSQL, or auth app. On Linux/macOS use `./scripts/start.sh`; on Windows PowerShell use `./scripts/start.ps1`.

| Need | Linux/macOS | Windows PowerShell | What starts |
| --- | --- | --- | --- |
| Landing page (default) | `./scripts/start.sh local web` | `./scripts/start.ps1 local web` | web only |
| Auth shell | `./scripts/start.sh local auth` | `./scripts/start.ps1 local auth` | auth only |
| API work | `./scripts/start.sh local api` | `./scripts/start.ps1 local api` | API; expects locally running PostgreSQL |
| Entire local stack | `./scripts/start.sh local all` | `./scripts/start.ps1 local all` | web, auth, API; expects locally running PostgreSQL |
| Web container | `./scripts/start.sh docker web` | `./scripts/start.ps1 docker web` | web container only |
| API container | `./scripts/start.sh docker api` | `./scripts/start.ps1 docker api` | API plus PostgreSQL |
| Database only | `./scripts/start.sh docker db` | `./scripts/start.ps1 docker db` | PostgreSQL only |
| Everything in Docker | `./scripts/start.sh docker all --tools` | `./scripts/start.ps1 docker all -Tools` | web, auth, API, PostgreSQL, pgAdmin |

Client-only targets validate Node 22+ and pnpm only. API targets additionally validate Python 3.12+, a reachable PostgreSQL instance, and prepare the API virtual environment. `--tools` / `-Tools` adds pgAdmin at `http://localhost:5050` and is deliberately limited to the Docker `all` target.

## Stop safely

Use the matching stop command when you are finished. Local processes are recorded in the ignored `.runtime/` directory, so the script only terminates services it started; it does not guess from port numbers.

```bash
./scripts/stop.sh                    # stop local web (the default)
./scripts/stop.sh local api           # stop locally started API
./scripts/stop.sh local all           # stop locally started full stack
./scripts/stop.sh docker web          # stop web container
./scripts/stop.sh docker api          # stop API and its PostgreSQL container
./scripts/stop.sh docker all          # stop and remove the complete Compose stack
```

On Windows PowerShell, replace `stop.sh` with `stop.ps1`. Docker `all` uses `docker compose down --remove-orphans`: it releases every project port and network while preserving PostgreSQL/pgAdmin volumes. The stop command intentionally never removes database volumes.

| Service | Local URL |
| --- | --- |
| Web | http://localhost:3000 |
| Auth | http://localhost:3001 |
| API | http://localhost:8000/docs |
| pgAdmin (Docker tools profile only) | http://localhost:5050 |

The liveness endpoint is `/api/health`; `/api/ready` also verifies PostgreSQL connectivity. Local PostgreSQL defaults are in `.env.example`. Do not commit `.env` or reuse its development password outside a local machine.

## Individual services

```bash
pnpm --filter @bayes/web dev
pnpm --filter @bayes/auth dev
cd server/services/api && .venv/bin/python -m uvicorn app.main:app --reload
```

On Windows, replace the final command with `server\services\api\.venv\Scripts\python.exe -m uvicorn app.main:app --reload`; on Linux/macOS, run the command from `server/services/api`.
