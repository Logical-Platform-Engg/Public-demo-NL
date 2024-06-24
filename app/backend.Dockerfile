# Use the official Node.js 14 image as a base
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY backend/package*.json ./

# # Install dependencies
# RUN npm install

# Copy the rest of the application code to the working directory
COPY backend/ .

# Install Terraform
RUN apt-get update && \
    apt-get install -y wget unzip && \
    wget https://releases.hashicorp.com/terraform/0.15.0/terraform_0.15.0_linux_amd64.zip && \
    unzip terraform_0.15.0_linux_amd64.zip -d /usr/local/bin && \
    rm terraform_0.15.0_linux_amd64.zip

# Expose port 5000
EXPOSE 5000

# Command to run npm install before starting the application
CMD ["sh", "-c", "npm install && node server.js"]
