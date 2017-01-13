#!/usr/bin/env bash

if [[ $TRAVIS_BRANCH == "master" && $TRAVIS_PULL_REQUEST == false && $RUN_TESTS == true ]]
then
    echo -e "\n## Configuring gcloud client"
    # Set the correct project for deployment
    gcloud config set project project-cookomatic

    echo -e "\n### Deploying to App Engine"
    gcloud -q app deploy app.yaml --promote
fi
