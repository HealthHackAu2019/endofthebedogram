#! /bin/bash

yarn build
aws s3 sync --acl public-read ./build s3://www.junohealth.com
