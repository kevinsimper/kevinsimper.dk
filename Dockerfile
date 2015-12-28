FROM node:5

EXPOSE 9000

WORKDIR /app

ADD . /app

RUN npm install && npm rebuild

RUN npm run build

CMD npm start
