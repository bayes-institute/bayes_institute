# Applications

- `web` is the public Bayes Institute presence.
- `auth` is a deliberately minimal SSO boundary, ready to receive an identity-provider integration.

Future student learning and faculty/operations platforms should be added here when their requirements are known. They should authenticate through `auth` and consume the API rather than depending on another app's internals.
