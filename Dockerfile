# ==============================
# Stage 1: Build React frontend
# ==============================

FROM node:22-alpine AS frontend-builder

WORKDIR /frontend

# Copy frontend package files
COPY nexora-web/package*.json ./

# Install frontend dependencies
RUN npm ci

# Copy frontend source
COPY nexora-web/ ./

# React will call the backend on the same domain
ENV VITE_API_URL=/api

# Build React
RUN npm run build


# ==============================
# Stage 2: Backend
# ==============================

FROM node:22-alpine

WORKDIR /app

# Copy backend package files
COPY nexora-api/package*.json ./

# Install backend dependencies
RUN npm ci --omit=dev

# Copy backend source
COPY nexora-api/ ./

# Copy React build into backend
COPY --from=frontend-builder /frontend/dist ./public

# Render will provide PORT
EXPOSE 5000

# Start Express
CMD ["npm", "start"]