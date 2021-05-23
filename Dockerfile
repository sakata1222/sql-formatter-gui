FROM node:lts-alpine as build
WORKDIR /tmp/repo
COPY . .
RUN yarn install --production && \
  yarn build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html/
COPY --from=build /tmp/repo/build .
RUN \
  sed -i.backup -e 's/^\(\s*listen\s\s*\)80;/\15000;/' /etc/nginx/conf.d/default.conf && \
  sed -i.backup -e 's/^\(pid\s\s*\)\/var\/run\/nginx.pid;/\1\/tmp\/nginx.pid;/' /etc/nginx/nginx.conf && \
  sed -i.backup -e 's/^user\s\s*nginx;//' /etc/nginx/nginx.conf && \
  touch /tmp/nginx.pid && \
  chown nginx:nginx /tmp/nginx.pid && \
  chmod 600 /tmp/nginx.pid && \
  chown -R nginx:nginx /var/cache/nginx
USER nginx

CMD ["nginx", "-g", "daemon off;"]
