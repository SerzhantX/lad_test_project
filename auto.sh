#!/bin/bash

echo "--- start build container"
docker build -t lad-test-project-backend .

echo "--- starting services"
docker-compose up --build -d