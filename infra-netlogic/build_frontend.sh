!/bin/bash

# Set the backend URL in the .env file
echo "REACT_APP_BACKEND_URL=${BACKEND_URL}" > "${path_to_frontend}/.env"

# Change directory to the frontend folder and run npm build
cd "${path_to_frontend}" && npm install && npm run build

# Check if frontend-image exists locally
if docker images --format "{{.Repository}}" | grep -q "gcr.io/nlpe1-427015/frontend-image"; then
    # If the image exists, remove it
    docker rmi gcr.io/nlpe1-427015/frontend-image
fi

pwd
cd ..
# Change directory to the parent folder of frontend and build the Docker image
docker build -f frontend.Dockerfile -t gcr.io/nlpe1-427015/frontend-image .

# Push the Docker image to Google Container Registry
docker push gcr.io/nlpe1-427015/frontend-image:latest

sleep 10
