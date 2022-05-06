#!/bin/bash

echo "VERCEL_ENV: $VERCEL_ENV"
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_ENV" == "production" ]] ; then
  # Proceed with the build
  echo "✅ - Build main branch for production"
  exit 1;

elif [ ["$VERCEL_GIT_COMMIT_REF" == "development"] ]; then
  echo "✅ - Build will proceed for development branch"
  exit 1;

else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi