!/bin/bash

# Check if backend-image exists locally
if docker images --format "{{.Repository}}" | grep -q "gcr.io/nlpe1-427015/backend-image"; then
    # If the image exists, remove it
    docker rmi gcr.io/nlpe1-427015/backend-image
fi

cd ../app/

docker build -f backend.Dockerfile -t gcr.io/nlpe1-427015/backend-image .
docker push gcr.io/nlpe1-427015/backend-image