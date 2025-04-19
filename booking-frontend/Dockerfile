# Stage 1: Build Angular app
FROM node:18 as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration=production

# Stage 2: Serve with nginx
FROM nginx:alpine

COPY --from=builder /app/dist/booking-frontend/browser /usr/share/nginx/html

RUN mv /usr/share/nginx/html/index.csr.html /usr/share/nginx/html/index.html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
