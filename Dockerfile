FROM node:lts-alpine
WORKDIR /tmp/repo
COPY . .
RUN adduser -S sql-formatter && \
  rm -rf node_modules && \
  npm install && \
  npm run build
USER sql-formatter

CMD ["npm", "run", "serve"]
