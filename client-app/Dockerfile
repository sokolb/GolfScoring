FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the production version of the application
# Set NODE_OPTIONS inline for the build command only
RUN export NODE_OPTIONS=--openssl-legacy-provider && npm run build

# Expose port 3000 to the host
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
