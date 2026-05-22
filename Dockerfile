FROM node:20-alpine

WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy application source
COPY . .

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Switch to non-root user
USER appuser

# Expose app port
EXPOSE 3000

# Healthcheck
HEALTHCHECK CMD wget --spider http://localhost:3000/health || exit 1

# Start application
CMD ["node", "src/index.js"]