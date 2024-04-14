FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY frontend/package*.json ./

RUN npm install

# Copy the rest of the application code to the working directory
COPY frontend/ .

# Build the application in container
RUN npm run build

# Expose the port (change if there is other) 
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
