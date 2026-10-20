# Backend services

Each directory here is one independently buildable and deployable long-running service. It owns its container definition, dependency manifest, entry point, tests, and deployment configuration.

`api/` is the main backend today. Future examples might include a notifications service or a domain-specific integration service, but do not create placeholders until a separate runtime is justified.
