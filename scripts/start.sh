#!/usr/bin/env bash

PROJECT_ROOT="/home/ubuntu/react/handwriting-promotion"
TIME_NOW=$(date +%c)

cd $PROJECT_ROOT

# 생성된 도커 컨테이너가 없다면 생성
if [ -z $(docker ps -aqf name=handwriting_react)]; then
# 생성된 도커 이미지가 없다면 생성
    if [-z $(docker images --filter=reference="nginx-react" -q)]; then
        docker build -t nginx-react:0.1 .
    fi
    docker run \
    -v $(pwd)/build:/app/build \
    -d --name handwriting_react \
    --network=kong-net \
    -p 3000:80 \
    nginx-react:0.1 
# 빌드 결과 반영을 위한 재실행
else
    docker restart $(docker ps -aqf name=handwriting_react) 
fi