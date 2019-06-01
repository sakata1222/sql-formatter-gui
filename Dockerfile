FROM node:lts-alpine as build
WORKDIR /tmp/repo
COPY . .
RUN npm install --production && \
  npm run build

FROM node:lts-alpine
WORKDIR /usr/bin/sql-formatter
COPY --from=build /tmp/repo/build ./build
RUN npm install -g serve && \
  adduser -S sql-formatter
USER sql-formatter

CMD ["serve", "-s", "build"]
