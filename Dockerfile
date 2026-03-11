# Use Node.js lts-alpine for lightweight dev image
FROM node:lts-alpine AS builder

# Set working directory
WORKDIR /app

# Enable corepack and install pnpm
RUN corepack enable

RUN corepack install -g pnpm@latest

# Copy package files
COPY package*.json ./

# Install dependencies with caching
RUN npm install --silent

# Copy source code
COPY . .

RUN npm run build-only

FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]