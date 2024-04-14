# Use the official Node.js 14 image as a base
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY backend/ .

# Expose port 5000
EXPOSE 5000

# Command to run the application
CMD ["node", "server.js"]
