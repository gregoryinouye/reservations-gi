FROM node:6.13-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install

EXPOSE 3020

CMD ["npm", "run", "docker-start"]