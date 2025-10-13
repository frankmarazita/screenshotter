#!/usr/bin/env bash

set -eu -o pipefail

source .env

REPO_URL="$(git config --get remote.origin.url)"
REPO_USER=$(echo "$REPO_URL" | sed -E 's/.*[:\/]([^\/]+)\/.*/\1/')
export REPO_NAME=$(echo "$REPO_URL" | sed -E 's/.*[:\/]([^\/]+)\/(.*)\.git/\2/')

echo $GITHUB_TOKEN | docker login ghcr.io -u $REPO_USER --password-stdin

export IMAGE_URL="ghcr.io/$REPO_USER/$REPO_NAME"

docker pull $IMAGE_URL:latest

docker compose up -d --remove-orphans

# clean up old images

IMAGES=$(docker images -q $IMAGE_URL)
LATEST=$(docker images -q $IMAGE_URL:latest)

for IMAGE in $IMAGES; do
  if [ "$IMAGE" != "$LATEST" ]; then
    docker rmi "$IMAGE"
  fi
done
