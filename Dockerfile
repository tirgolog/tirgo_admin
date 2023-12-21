# Stage 1: Build Angular app
FROM node:14 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build the Angular app and copy to /usr/share/nginx/html/admin-ui
RUN npm run build --prod --output-path=/usr/share/nginx/html/admin-ui

# Stage 2: Use Nginx for serving the Angular app
FROM nginx:alpine

# Set an ARG to specify the project name
ARG PROJECT_NAME=admin-ui

# Set the project-specific Nginx configuration directory
ARG NGINX_CONF_DIR=/etc/nginx/conf.d/${PROJECT_NAME}

# Remove default Nginx configuration
RUN rm -rf /etc/nginx/conf.d/default.conf

# Create the project-specific Nginx configuration directory
RUN mkdir -p ${NGINX_CONF_DIR}

# Copy the custom Nginx configuration for the specific project
COPY nginx/${PROJECT_NAME}.conf ${NGINX_CONF_DIR}/

# Copy the built app from the build image
COPY --from=build /usr/share/nginx/html/${PROJECT_NAME} /usr/share/nginx/html/${PROJECT_NAME}

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
