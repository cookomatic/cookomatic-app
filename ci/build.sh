#!/usr/bin/env bash

echo -e "\n## Installing Node.js modules"
npm install

echo -e "\n## Building application"
npm run ionic:build
