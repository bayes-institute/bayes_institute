# Asynchronous jobs

Use this directory for finite, independently deployed Cloud Run Jobs—for example, a batch import, scheduled reconciliation, or a workload triggered after a Pub/Sub event is accepted by a service.

Each future job should own its own dependency manifest, Dockerfile, entry point, and event/input contract. Keep Pub/Sub delivery/dispatch code explicit; a job should not implicitly depend on another service's implementation.
