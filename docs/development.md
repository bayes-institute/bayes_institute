# Development guide

## Start only what you need

The first API or database launch creates `.env` from `.env.example` if it does not exist. You can also create it yourself before changing local credentials:

```bash
cp .env.example .env
```

The default target is `web`, so landing-page work does not start the API, PostgreSQL, or auth app. On Linux/macOS use `./scripts/start.sh`; on Windows PowerShell use `./scripts/start.ps1`.

| Need | Linux/macOS | Windows PowerShell | What starts |
| --- | --- | --- | --- |
| Landing page (default) | `./scripts/start.sh local web` | `./scripts/start.ps1 web` | web only |
| Auth shell | `./scripts/start.sh local auth` | `./scripts/start.ps1 auth` | auth only |
| PostgreSQL | `./scripts/start.sh docker db` | `./scripts/start.ps1 db` | local PostgreSQL service on Windows |
| API work | `./scripts/start.sh local api` | `./scripts/start.ps1 api` | PostgreSQL and FastAPI |
| Entire local stack | `./scripts/start.sh local all` | `./scripts/start.ps1 all` | PostgreSQL, web, auth, and FastAPI |
| Web container | `./scripts/start.sh docker web` | `./scripts/start.ps1 docker web` | web container only |
| API container | `./scripts/start.sh docker api` | `./scripts/start.ps1 docker api` | API plus PostgreSQL |
| Database only | `./scripts/start.sh docker db` | `./scripts/start.ps1 docker db` | PostgreSQL only |
| Everything in Docker | `./scripts/start.sh docker all --tools` | `./scripts/start.ps1 docker all -Tools` | web, auth, API, PostgreSQL, pgAdmin |

PowerShell accepts both shorthand (`start.ps1 web`) and explicit mode (`start.ps1 local web`). Client-only targets validate Node 22+ and pnpm only. On Windows, local database/API targets use the installed PostgreSQL Windows service, provision the development role/database with `POSTGRES_ADMIN_*` when necessary, and prepare the Python 3.12 API virtual environment. The matching stop script stops PostgreSQL only when the start script started it; a service that was already running is left alone. `--tools` / `-Tools` adds pgAdmin at `http://localhost:5050` and is deliberately limited to the Docker `all` target.

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

On Windows PowerShell, use the same target shorthand, such as `./scripts/stop.ps1 web` or `./scripts/stop.ps1 all`. Docker `all` uses `docker compose down --remove-orphans`: it releases every project port and network while preserving PostgreSQL/pgAdmin volumes. The stop command intentionally never removes database volumes.

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
