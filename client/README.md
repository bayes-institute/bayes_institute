# Client workspace

This is the pnpm/Turborepo portion of the repository. Applications own routes, composition, and product-specific state. Packages own reusable UI, types, and configuration.

Use the `@bayes/*` namespace for workspace packages. Do not import application source from another application; move shared code into `packages/` instead.
