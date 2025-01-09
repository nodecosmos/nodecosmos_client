# ----------------------------
# Dockerfile (multi-stage)
# ----------------------------

# ---------- Stage 1: Development ----------
FROM node:22-alpine AS dev

ARG ENVIRONMENT=development
ENV NODE_ENV=$ENVIRONMENT

WORKDIR /app

COPY package.json .npmrc ./
RUN npm install

COPY . .

# Expose dev port
EXPOSE 3001

# This is the command for dev mode (hot reload)
CMD ["npm", "start"]

# ---------- Stage 2: Production Build ----------
FROM node:22-alpine AS build

ARG ENVIRONMENT=production
ENV NODE_ENV=$ENVIRONMENT

WORKDIR /app

COPY package.json .npmrc ./
RUN npm install

COPY . .
RUN npm run build


# ---------- Stage 3: Production Runtime ----------
FROM nginx:stable-alpine

# Copy built files from the production build stage
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
