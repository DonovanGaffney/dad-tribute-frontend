FROM node:24-alpine as build
WORKDIR /ng-app
COPY package*.json .
RUN npm ci --force
COPY . .
RUN npm run build --configuration=production


# Use nginx as base image
FROM nginx:alpine

# Copy your Angular app files to the nginx html directory
COPY --from=build /ng-app/dist/DadMemories/browser /usr/share/nginx/html

# Copy nginx config file
COPY --from=build /ng-app/nginx.conf  /etc/nginx/conf.d/default.conf

# Expose port 443 (assuming your Angular app is running on this port)
EXPOSE 1000

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
