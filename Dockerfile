FROM node:16-alpine

EXPOSE 9000

WORKDIR /app

ADD package.json package-lock.json /app/

RUN npm i --legacy-peer-deps

ADD . /app

RUN npm run build

CMD npm start
