# Platform roadmap

## Current scaffold

- Public web reset (`client/apps/web`)
- Account/SSO boundary (`client/apps/auth`)
- Shared FastAPI API shell (`server`)
- Shared UI, type, and TypeScript configuration packages

## Before building the learning platform

1. Define the learner's core workflows and roles.
2. Decide identity provider, tenancy model, and user lifecycle.
3. Model the first API resources and authorization rules.
4. Add `client/apps/learning` with a product-specific route and state boundary.

## Before building the faculty platform

1. Decide whether it is a separate product or role-based area of learning.
2. Define permissions and data visibility independently from UI navigation.
3. Add it as a separate app only when deployment/release cadence or product ownership differs.

## Decisions to record

- Hosting and deployment targets
- Primary database and migration tool
- Background jobs and file storage
- Identity provider and organization/tenant model
- API versioning and typed-client generation approach
