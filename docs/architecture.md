# Architecture

## Boundaries

| Area | Responsibility | Rule |
| --- | --- | --- |
| `client/apps` | Product applications and route-level composition | Never import source from another app. |
| `client/packages` | Reusable UI, types, configuration, and later API clients | Must be usable by more than one app. |
| `server/services/api` | Main FastAPI HTTP API, domain services, and data access | Owns authorization and persistent data. |
| `server/services/*` | Independently deployable backend services | Add only when a runtime boundary is real. |
| `server/jobs/*` | Independently deployable asynchronous workloads | Use for Cloud Run Jobs when an event-driven workload needs a job runtime. |
| `server/shared/*` | Framework-neutral code shared by two or more server runtimes | Never make active services depend on each other's internals. |
| `client/apps/web/public` | Curated deployable brand, PWA, and social-metadata assets | Keep only assets with a concrete browser or product use. |
| `archive` | Superseded work retained for reference | Not part of active builds or deployments. |

## Product topology

```text
public web ─────┐
auth / SSO ─────┼──> main API service ──> database, Pub/Sub, third-party services
learning app ───┤             │
faculty app ────┘             └──> future Cloud Run services and jobs
```

Local development runs PostgreSQL alongside the API. Production replaces that local database with Cloud SQL; each executable remains an independently deployable Cloud Run service.

`web` and `auth` are the first active applications. The learning and faculty products are planned consumers, not prematurely created applications. When those boundaries become clear, create a workspace package under `client/apps/` and have it use the same authentication and API contracts.

## Authentication direction

The `auth` application is reserved as the single sign-on entry point. Choose the identity provider and protocol (typically OIDC with authorization code + PKCE) before implementing it. The API must verify access tokens; individual apps should delegate sign-in rather than implement separate identity stores.

## API contracts

FastAPI provides OpenAPI at `/openapi.json`. As API surface grows, generate a typed client or synchronize selected contracts into `@bayes/types`; avoid hand-copying request and response shapes in every app.
