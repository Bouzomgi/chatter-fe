# Stage 1: Build the React application
FROM node:20 AS builder

ENV REACT_APP_BACKEND_ENDPOINT="http://localhost:4000"
ENV REACT_APP_BACKEND_WEBSOCKET_ENDPOINT="ws://localhost:4000"

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the application using nginx
FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx configuration
RUN rm -rf /usr/share/nginx/html/*

# Copy the built React app from Stage 1 to nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Add custom Nginx configuration to handle client-side routing
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
