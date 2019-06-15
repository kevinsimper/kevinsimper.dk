FROM node:12.4

EXPOSE 9000

WORKDIR /app

ADD . /app

RUN yarn global add node-gyp && yarn

RUN npm run build

CMD npm start
