# FROM node:14-alpine

# # Set the working directory inside the container
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json to the working directory
# COPY frontend/package*.json ./

# RUN npm install

# # Copy the rest of the application code to the working directory
# COPY frontend/ .

# # Build the application in container
# RUN npm run build

# # Expose the port (change if there is other) 
# EXPOSE 3000

# # Command to run the application
# CMD ["npm", "start"]


    # Use a lightweight Node.js image
    FROM node:alpine

    # Set the working directory inside the container
    WORKDIR /app

    RUN pwd
    # Copy the built React app from the host to the container
    COPY frontend/build ./build

    # Install serve globally
    RUN npm install -g serve

    # Expose port 3000 to the outside world
    EXPOSE 3000

    # Command to serve the build folder 
    CMD serve -s build -l 3000



