!/bin/bash

# Check if backend-image exists locally
if docker images --format "{{.Repository}}" | grep -q "gcr.io/networklogic01/backend-image"; then
    # If the image exists, remove it
    docker rmi gcr.io/networklogic01/backend-image
fi

cd ../app/

docker build -f backend.Dockerfile -t gcr.io/networklogic01/backend-image .
docker push gcr.io/networklogic01/backend-image