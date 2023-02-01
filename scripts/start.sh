#!/usr/bin/env bash

PROJECT_ROOT="/home/ubuntu/react/handwriting-promotion"
TIME_NOW=$(date +%c)

cd $PROJECT_ROOT
docker restart $(docker ps -aqf name=handwriting_react)