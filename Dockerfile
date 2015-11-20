FROM node:4

ADD . /app

WORKDIR /app

RUN npm install

CMD npm start
