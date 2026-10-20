# Server workspace

This directory is organized by independently deployable runtime, not by a premature microservice taxonomy.

```text
server/
  services/
    api/       current main FastAPI backend service
  jobs/         future asynchronous Cloud Run Job entry points
  shared/       code that is genuinely shared by two or more server runtimes
```

The only active server runtime is `services/api`. Add a sibling under `services/` only when it needs an independent deployment, scaling profile, ownership boundary, or failure boundary. Add a sibling under `jobs/` when the work is finite and asynchronous rather than an always-on request service.

Services communicate through explicit HTTP/gRPC or event contracts. Do not import one service's `app/` module from another service. If two runtimes need common code, promote a small, framework-neutral package into `shared/` after the second use case exists.
