FROM nginx:alpine

ARG FRONTEND_DOMAIN
ARG BACKEND_DOMAIN

RUN apk add --no-cache openssl
RUN mkdir -p /etc/nginx/ssl
RUN openssl req -x509 -nodes -out /etc/nginx/ssl/certificate.crt -keyout /etc/nginx/ssl/certificate.key -subj "/C=FR/ST=NA/L=Angouleme/O=42/OU=42/CN=$DOMAIN_NAME/UID=unicord"

COPY conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 443