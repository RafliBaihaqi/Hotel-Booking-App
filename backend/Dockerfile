# Use a base Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies (including TypeScript)
RUN npm install

# Ensure TypeScript is installed globally
RUN npm install -g typescript

# Copy the rest of the application
COPY . .

# Ensure TypeScript has the correct permissions
RUN chmod +x ./node_modules/.bin/tsc

# Build the application
RUN npx tsc

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
