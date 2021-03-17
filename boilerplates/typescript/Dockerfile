FROM node:12-stretch-slim

# Set working directory
WORKDIR /usr/src/app

# Install PM2 globally
RUN npm install --global pm2

# Copy "package.json" and "package-lock.json" before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package.json ./
COPY ./yarn.lock ./

# Install dependencies
RUN yarn install

# Copy all files
COPY ./ ./

# Delete Dockerfile
RUN rm Dockerfile

# Build app
RUN yarn build

# Expose the listening port
EXPOSE 3000

# Set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0

# Set app port
ENV NUXT_PORT=3000

# Run container as non-root (unprivileged) user
# The "node" user is provided in the Node.js Alpine base image
USER node

# Launch app with PM2
CMD [ "pm2-runtime", "start", "yarn start" ]