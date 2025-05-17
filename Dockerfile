# Stage 1: Build the application
FROM node:slim AS builder

WORKDIR /app

# Copy root-level TypeScript files first (before src)
COPY typings.d.ts ./
COPY *.ts ./
COPY tsconfig.json ./
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY src ./src

# Build TypeScript
RUN npm run build

# Stage 2: Create the production image
FROM node:slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy built files from builder
COPY --from=builder /app/dist ./dist
# Copy any necessary runtime files
COPY --from=builder /app/*.env ./

# Expose ports (HTTP + REPL)
EXPOSE 3000 2580

# Command to run the application
CMD ["node", "dist/index.js"]