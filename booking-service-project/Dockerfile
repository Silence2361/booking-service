# Dockerfile
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build app
RUN npm run build

# Expose port (if using 3000 or another)
EXPOSE 3000

# Start app
CMD ["npm", "run", "start:prod"]
