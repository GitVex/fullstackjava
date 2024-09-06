# Use official node image as the base image
FROM node:20.17.0-alpine3.19 AS build

# Set the working directory
WORKDIR /usr/local/app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Build the Next.js application
RUN npm run build

ENV NODE_ENV production

# Step 7: Expose the port the app runs on
EXPOSE 3000

# Step 8: Start the Next.js application in production mode
CMD ["npm", "start"]