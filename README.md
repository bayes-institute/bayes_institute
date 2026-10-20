# Bayes Institute

This repository is the active foundation for Bayes Institute products. It is deliberately split by runtime boundary:

```text
client/                  pnpm + Turborepo workspace
  apps/
    web/                 public site, favicon/PWA assets, and Open Graph image
    auth/                future SSO entry point
  packages/
    ui/                  shared React components
    types/               shared API/domain contracts
    typescript-config/   shared TypeScript presets
server/                  independently deployable backend runtimes
  services/api/          main FastAPI backend service
  jobs/                  future Cloud Run Job entry points
  shared/                future cross-service, framework-neutral code
docs/                    architecture and product planning
archive/                 previous landing page, brochure, and ideation material
```

## Start what you need

Copy `.env.example` to `.env`, then choose your local environment:

```bash
./scripts/start.sh                    # web only (the default)
./scripts/start.sh local api          # API only; uses local PostgreSQL
./scripts/start.sh docker web         # web container only
./scripts/start.sh docker api         # API + PostgreSQL containers
./scripts/start.sh docker all --tools # full stack + development-only pgAdmin
```

On Windows PowerShell, use `./scripts/start.ps1` for web only, or `./scripts/start.ps1 docker all -Tools` for the full Docker stack.

The scripts validate only the prerequisites required by the selected target. See [the development guide](docs/development.md) for every target and its exact dependency checks.

Stop an environment with the matching scope, for example `./scripts/stop.sh local web`, `./scripts/stop.sh docker api`, or `./scripts/stop.sh docker all`. Docker's `all` stop releases all project ports without deleting database data.

The API is available at `http://localhost:8000`; interactive documentation is at `/docs`.

## Direction

The public site and auth shell are intentionally small fresh starts. Add a new platform as a workspace application under `client/apps/` only once its product boundary is clear; extract reusable pieces into `client/packages/` rather than importing between apps.

See [docs/architecture.md](docs/architecture.md) and [docs/planning/platform-roadmap.md](docs/planning/platform-roadmap.md) for the working blueprint.

## Deployment

The app containers are ready to deploy independently to Cloud Run. See [the Cloud Run deployment guide](docs/cloud-run.md) for the service model and first deployment commands.
