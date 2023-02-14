#!/usr/bin/env bash

PROJECT_ROOT="/home/ubuntu/react/handwriting-promotion"
TIME_NOW=$(date +%c)

cd $PROJECT_ROOT

# 생성된 도커 컨테이너가 없다면 생성
if [ -z $(sudo docker ps -aqf name=handwriting_react)]; then
# 생성된 도커 이미지가 없다면 생성
    if [ -z $(sudo docker images --filter=reference="nginx-react" -q)]; then
        sudo docker build -t nginx-react:0.1 .
    fi
    sudo docker run \
    -v $(pwd)/build:/app/build \
    -d --name handwriting_react \
    --network=kong-net \
    -p 3000:80 \
    nginx-react:0.1 
# 빌드 결과 반영을 위한 재실행
else
    sudo docker restart $(sudo docker ps -aqf name=handwriting_react) 
fi