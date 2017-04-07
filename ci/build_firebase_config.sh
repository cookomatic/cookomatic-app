#!/usr/bin/env bash

filename=src/config/firebase.ts

sed -i "s#FBASE_API_KEY#${FBASE_API_KEY}#" $filename
sed -i "s#FBASE_AUTH_DOMAIN#${FBASE_AUTH_DOMAIN}#" $filename
sed -i "s#FBASE_DATABASE_URL#${FBASE_DATABASE_URL}#" $filename
sed -i "s#FBASE_PROJECT_ID#${FBASE_PROJECT_ID}#" $filename
sed -i "s#FBASE_STORAGE_BUCKET#${FBASE_STORAGE_BUCKET}#" $filename
sed -i "s#FBASE_MESSAGE_ID#${FBASE_MESSAGE_ID}#" $filename
