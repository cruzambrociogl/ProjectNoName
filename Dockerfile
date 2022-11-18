FROM node:16-alpine

RUN npm install -g npm@latest

# Install yarn and other dependencies via apk
RUN apk update && apk add yarn python3 g++ make && rm -rf /var/cache/apk/*

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install -g expo-cli@latest

# Copy everthing in the same folder
# COPY . .

COPY ./.dockerignore .
COPY ./docker-compose.yaml .
COPY ./Dockerfile .

# CMD ["npm", "start"]