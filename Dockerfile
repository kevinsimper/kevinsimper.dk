FROM node:5

EXPOSE 9000

WORKDIR /app

ADD package.json /app/package.json

ADD ./node_modules /app/node_modules

RUN npm install && npm rebuild

ADD . /app

RUN npm run build

CMD npm start
