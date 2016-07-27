FROM node:6

EXPOSE 9000

WORKDIR /app

ADD package.json /app/package.json

RUN npm install

ADD . /app

RUN npm rebuild && npm run build

CMD npm start
