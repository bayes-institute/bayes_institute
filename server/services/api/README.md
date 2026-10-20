# Main backend API service

This FastAPI service is the main backend boundary for client platforms. Keep transport routes in `app/api/`, domain logic in future feature modules, and infrastructure adapters outside route handlers. It is independently containerized and deployed as the `bayes-api` Cloud Run service.

For a local development environment, use the root startup scripts or install from this directory with `pip install -e '.[dev]'`.
