# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Accept build arguments for Vite environment variables
ARG VITE_PROCTORING_API_URL=http://localhost:8001
ARG VITE_PROCTORING_WS_URL
ARG VITE_SUPABASE_URL=https://ukwnvvuqmiqrjlghgxnf.supabase.co
ARG VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrd252dnVxbWlxcmpsZ2hneG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MDQwMTEsImV4cCI6MjA3NTk4MDAxMX0.XhfmvtzuoEXXOrhenEFPzzVQNcIiZhcV3KAClmZnKEI
ARG VITE_SUPABASE_PUBLISHABLE_KEY
ARG VITE_SUPABASE_PROJECT_ID

# Set as environment variables for Vite build
ENV VITE_PROCTORING_API_URL=$VITE_PROCTORING_API_URL
ENV VITE_PROCTORING_WS_URL=$VITE_PROCTORING_WS_URL
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY
ENV VITE_SUPABASE_PROJECT_ID=$VITE_SUPABASE_PROJECT_ID

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build both student and admin applications
RUN npm run build:all

# Production stage
FROM nginx:alpine

# Install envsubst for environment variable substitution
RUN apk add --no-cache gettext

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create nginx templates directory
RUN mkdir -p /etc/nginx/templates

# Copy nginx configuration template (will use Railway's PORT env var)
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Copy entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Expose port (Railway will set PORT env var dynamically)
EXPOSE 80

# Use entrypoint script to handle PORT substitution
ENTRYPOINT ["/docker-entrypoint.sh"]

