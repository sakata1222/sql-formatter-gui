FROM node:lts-alpine as build
WORKDIR /tmp/repo
COPY . .
RUN yarn install --production --frozen-lockfile && \
  yarn build

FROM nginx:alpine
WORKDIR /etc/nginx/html/
COPY --from=build /tmp/repo/build .
RUN \
  chown nginx:nginx -R /etc/nginx/conf.d/ && \
  sed -i.backup -e 's/^\(pid\s\s*\)\/var\/run\/nginx.pid;/\1\/tmp\/nginx.pid;/' /etc/nginx/nginx.conf && \
  echo -e "\n\
  \n\
  server {\n\
    listen 5000;\n\
  }\n\
  " >> /etc/nginx/conf.d/z_customize.conf && \
  sed -i.backup -e 's/^user\s\s*nginx;//' /etc/nginx/nginx.conf && \
  touch /tmp/nginx.pid && \
  chown nginx:nginx /tmp/nginx.pid && \
  chmod 600 /tmp/nginx.pid && \
  chown -R nginx:nginx /var/cache/nginx
USER nginx

CMD ["nginx", "-g", "daemon off;"]
