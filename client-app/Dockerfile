FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Set NODE_OPTIONS as environment variable for the build
ENV NODE_OPTIONS=--openssl-legacy-provider

# Build the production version of the application
RUN npm run build

# Clear NODE_OPTIONS after build
ENV NODE_OPTIONS=

# Expose port 3000 to the host
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
