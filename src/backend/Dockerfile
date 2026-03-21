FROM node:20-alpine

WORKDIR /app
# For the backend, HTTPS must be used everywhere
RUN apk add --no-cache openssl
RUN mkdir /app/secrets
RUN openssl req -newkey rsa:2048 -nodes -keyout /app/secrets/private-key.pem \
    -x509 -days 365 -out /app/secrets/public-certificate.pem \
    -subj "/C=FR/ST=IDF/L=Paris/O=Dev/CN=localhost"

COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build

EXPOSE 443

CMD ["node", "dist/main.js"]