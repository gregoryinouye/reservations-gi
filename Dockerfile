FROM node:latest

RUN mkdir -p /src/app

WORKDIR /src/app
COPY package*.json ./

COPY . .

RUN npm install pm2 -g
RUN npm install --production
RUN npm install webpack -g
RUN npm install webpack-cli -g

EXPOSE 80

CMD [ "npm", "run", "dockerize" ]