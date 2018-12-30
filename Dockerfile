FROM node:11.6

EXPOSE 9000

WORKDIR /app

ADD . /app

RUN yarn global add node-gyp && yarn

RUN npm run build

CMD npm start
