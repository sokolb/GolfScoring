FROM node:18.20.8-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build args are baked into the Vite bundle at build time
ARG VITE_API_URL
ARG VITE_USERNAME
ARG VITE_PASSWORD
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_USERNAME=$VITE_USERNAME
ENV VITE_PASSWORD=$VITE_PASSWORD

# Build the production version of the application
RUN npm run build

# Expose port 3000 to the host
EXPOSE 3000

# Serve the built files with vite preview
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "3000"]
