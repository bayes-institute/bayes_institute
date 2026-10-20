#!/usr/bin/env bash
set -Eeuo pipefail

SERVICE="${1:?Usage: ./scripts/deploy-cloud-run.sh <web|auth|api>}"
PROJECT_ID="${GOOGLE_CLOUD_PROJECT:?Set GOOGLE_CLOUD_PROJECT first.}"
REGION="${GOOGLE_CLOUD_REGION:-asia-south1}"
REPOSITORY="${ARTIFACT_REPOSITORY:-bayes}"

case "$SERVICE" in
  web|auth|api) ;;
  *) echo "Service must be web, auth, or api." >&2; exit 1 ;;
esac

command -v gcloud >/dev/null || { echo "gcloud CLI is required." >&2; exit 1; }
IMAGE="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY}/bayes-${SERVICE}:$(git rev-parse --short HEAD)"
ACCESS_FLAG="--no-allow-unauthenticated"
if [[ "$SERVICE" == "web" ]]; then
  ACCESS_FLAG="--allow-unauthenticated"
fi

gcloud builds submit --project "$PROJECT_ID" --config "deploy/cloudbuild.${SERVICE}.yaml" --substitutions "_IMAGE=${IMAGE}" .
gcloud run deploy "bayes-${SERVICE}" --project "$PROJECT_ID" --region "$REGION" --image "$IMAGE" --platform managed "$ACCESS_FLAG"
