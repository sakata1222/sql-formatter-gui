FROM node:lts-alpine as build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /tmp/repo
COPY . .
RUN pnpm install --frozen-lockfile && \
  pnpm build

FROM nginx:alpine
WORKDIR /etc/nginx/html/
COPY --from=build /tmp/repo/dist .
RUN \
  chown nginx:nginx -R /etc/nginx/conf.d/ && \
  sed -i.backup -e 's/^\(pid\s\s*\)\/var\/run\/nginx.pid;/\1\/tmp\/nginx.pid;/' /etc/nginx/nginx.conf && \
  echo -e "\n\
  \n\
  server {\n\
    listen 5000;\n\
    server_tokens off;\n\
    add_header X-Frame-Options SAMEORIGIN;\n\
    add_header X-Content-Type-Options nosniff;\n\
    add_header Referrer-Policy strict-origin-when-cross-origin;\n\
    add_header Permissions-Policy \"camera=(), microphone=(), geolocation()\";\n\
    add_header Content-Security-Policy \"default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; img-src 'self' data:;\";\n\
  }\n\
  " >> /etc/nginx/conf.d/z_customize.conf && \
  sed -i.backup -e 's/^user\s\s*nginx;//' /etc/nginx/nginx.conf && \
  touch /tmp/nginx.pid && \
  chown nginx:nginx /tmp/nginx.pid && \
  chmod 600 /tmp/nginx.pid && \
  chown -R nginx:nginx /var/cache/nginx
USER nginx

CMD ["nginx", "-g", "daemon off;"]
