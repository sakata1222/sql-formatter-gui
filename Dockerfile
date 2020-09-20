FROM node:lts-alpine as build
WORKDIR /tmp/repo
COPY . .
RUN yarn install --production && \
  yarn build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html/
COPY --from=build /tmp/repo/build .
RUN sed -i.backup -e 's/^\(\s*listen\s*\)80;/\15000;/' /etc/nginx/conf.d/default.conf && \
  touch /var/run/nginx.pid && \
  chown -R nginx:nginx /var/run/nginx.pid && \
  chown -R nginx:nginx /var/cache/nginx
USER nginx

CMD ["nginx", "-g", "daemon off;"]
