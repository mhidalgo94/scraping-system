FROM node:16-alpine 

# Set the working directory to /app inside the container
WORKDIR /app

COPY . .
#Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm install --force

# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV REACT_APP_API_URL_BASE=http://localhost:8000

# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
CMD [ "npx", "serve", "build" ]