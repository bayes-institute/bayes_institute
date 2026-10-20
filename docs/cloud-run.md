# Cloud Run deployment model

Each executable is independently containerized and deploys as its own Cloud Run **service**, not a Cloud Run Job:

| Cloud Run service | Container | Exposure |
| --- | --- | --- |
| `bayes-web` | `client/Dockerfile` with `APP_NAME=web` | public |
| `bayes-auth` | `client/Dockerfile` with `APP_NAME=auth` | public after SSO design is implemented |
| `bayes-api` | `server/services/api/Dockerfile` | private by default; expose only through deliberate API policy |

The containers honor Cloud Run's injected `PORT` variable. pgAdmin and PostgreSQL Compose services are local-only; neither is a Cloud Run deployment target. In production, use Cloud SQL for PostgreSQL and keep the API connection string in Secret Manager rather than a repository or image.

## Initial project setup

```bash
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com
gcloud artifacts repositories create bayes \
  --repository-format=docker \
  --location=asia-south1
```

Set your values and deploy one service at a time:

```bash
export GOOGLE_CLOUD_PROJECT="your-project-id"
export GOOGLE_CLOUD_REGION="asia-south1"
./scripts/deploy-cloud-run.sh web
./scripts/deploy-cloud-run.sh auth
./scripts/deploy-cloud-run.sh api
```

The script builds through Cloud Build using the corresponding `deploy/cloudbuild.*.yaml`, pushes an immutable commit-tagged image to Artifact Registry, then deploys it. It makes only `bayes-web` public; auth and API remain private until their access policies are deliberately designed. Before public release, configure custom domains, Cloud SQL connectivity, CORS, a user-managed service account, secrets, and least-privilege IAM. Pass secrets to Cloud Run from Secret Manager; never put production database credentials in `--set-env-vars` or `.env`.

Google's current guidance is to deploy container images with `gcloud run deploy` and use Artifact Registry; Cloud Run services inject `PORT`, and services are private by default. See the [Cloud Run deployment documentation](https://cloud.google.com/run/docs/deploying), [service configuration documentation](https://cloud.google.com/run/docs/configuring), and [Secret Manager integration guidance](https://cloud.google.com/run/docs/configuring/services/secrets).
