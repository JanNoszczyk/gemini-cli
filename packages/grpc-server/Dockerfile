# Use a Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY packages/grpc-server/package.json packages/grpc-server/package-lock.json ./packages/grpc-server/
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the gRPC server package
RUN npm run build --workspace=packages/grpc-server

# Expose the gRPC port
EXPOSE 50051

# Run the gRPC server
CMD ["node", "packages/grpc-server/dist/index.js"]
