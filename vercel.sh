#!/bin/bash

# Vercel deployment Ignored Build Step 
# https://vercel.com/docs/concepts/projects/overview#ignored-build-step

echo "VERCEL_ENV: $VERCEL_ENV"
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_ENV" == "production" || "$VERCEL_GIT_COMMIT_REF" == "development"]] ; then
  # Proceed with the build
  echo "✅ - Build Ok "
  exit 1;

else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi