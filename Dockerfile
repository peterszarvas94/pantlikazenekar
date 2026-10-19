FROM node:24-bookworm-slim AS build
WORKDIR /src
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM caddy:2.11-alpine
COPY docker/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /src/dist/ /srv/
USER 10001:10001
EXPOSE 8080
