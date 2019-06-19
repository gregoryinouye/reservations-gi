# FROM keymetrics/pm2:latest
FROM node:latest

RUN mkdir -p /src/app

WORKDIR /src/app
COPY package*.json ./

COPY . .

RUN npm install --production
RUN npm install webpack -g

EXPOSE 3020
EXPOSE 6379

CMD [ "npm", "run", "dockerize" ]