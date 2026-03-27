FROM node:20-alpine

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

EXPOSE 3001

# Wait for it
RUN apk add --no-cache bash
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

CMD ["/wait-for-it.sh", "-t", "60", "backend:443", "--", "npm", "run", "preview", "--", "--port", "3001", "--host"]