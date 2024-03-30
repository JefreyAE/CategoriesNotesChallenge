#!/bin/bash

# Docker Compose
cd backend
docker-compose up -d

# Wait for backend container to be ready
while [[ "$(docker-compose ps -q db | xargs docker inspect -f '{{.State.Status}}')" != "running" ]]; do
  sleep 5
done

cd ..

# Install dependencies and run the app Next.js (frontend)
cd frontend
npm install
npm run dev &

cd ..

# Install dependencies and run the app Nest.js (backend)
cd backend
npm install
npm run start:dev

