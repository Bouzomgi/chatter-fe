#!/bin/bash

# Initialize the variable
DISTRIBUTION_ID=""
DISTRIBUTIONS=$(aws cloudfront list-distributions --query "DistributionList.Items[*].Id" --output text)

for ID in $DISTRIBUTIONS; do
  TAGS=$(aws cloudfront list-tags-for-resource --resource "arn:aws:cloudfront::${AWS_ACCOUNT_ID}:distribution/$ID" --query "Tags.Items[?Key=='project' && Value=='chatter']" --output text)

  if [ "$TAGS" != "None" ]; then
    DISTRIBUTION_ID=$ID
    break
  fi
done

if [ -z "$DISTRIBUTION_ID" ]; then
  echo "Error: No CloudFront distribution with the specified tag found. Exiting with failure."
  exit 1
fi

echo "::set-output name=distribution-id::$DISTRIBUTION_ID"
