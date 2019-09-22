#! /bin/bash

yarn build

aws s3 sync --acl public-read ./build s3://www.junohealth.com
aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths /index.html
