# Use Node.js official image
FROM node:20-alpine as builder

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Generate Prisma client
# Only generate Prisma client (optional but helpful)
RUN npx prisma generate

# Build NestJS app
RUN npm run build

# Expose the configured app port
EXPOSE 8000

# Start the app
CMD ["node", "dist/main"]
