#!/usr/bin/env bash

PROJECT_ROOT="/home/ubuntu/react/handwriting-promotion"

DEPLOY_LOG="$PROJECT_ROOT/deploy.log"

TIME_NOW=$(date +%c)

cd $PROJECT_ROOT
# 기존 소스 삭제
rm -rf *