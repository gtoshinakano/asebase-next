#!/bin/bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == "main" || "$VERCEL_GIT_COMMIT_REF" == "development"  ]] ; then
  # Build only main and development branches
    echo "✅ - Build Ok"
  exit 1;

else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi