# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runtime con Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copiar archivos build desde builder
COPY --from=builder /build/build .

# Copiar configuración nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Crear usuario no-root
RUN addgroup -g 101 -S nginx-user && \
    adduser -u 101 -S nginx-user -G nginx-user && \
    chown -R nginx-user:nginx-user /usr/share/nginx/html /var/cache/nginx

USER nginx-user

# Puertos expuestos
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:3000/ || exit 1

# Nginx inicia por defecto
CMD ["nginx", "-g", "daemon off;"]
