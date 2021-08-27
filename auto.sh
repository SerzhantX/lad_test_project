#!/bin/bash

echo "start build container"
docker build -t lad-test-project .

echo "starting services"
docker-compose up --build -d