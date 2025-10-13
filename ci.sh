#!/usr/bin/env bash

set -eu -o pipefail

git pull

DEPLOY_FAILED=false

./deploy.sh || DEPLOY_FAILED=true

REPO_URL="$(git config --get remote.origin.url)"
REPO_NAME=$(echo "$REPO_URL" | sed -E 's/.*[:\/]([^\/]+)\/(.*)\.git/\2/')

TITLE="Deploy: $REPO_NAME"
BODY="Deployed successfully ✅"

if [ "$DEPLOY_FAILED" = true ]; then
  BODY="Failed to deploy ❌"
fi

curl -X POST -H "Content-Type: application/json" -d '{ "type": "discord", "title": "'"$TITLE"'", "body": "'"$BODY"'" }' http://localhost:7665/message || true

if [ "$DEPLOY_FAILED" = true ]; then
  exit 1
fi
