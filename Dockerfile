FROM node:lts-alpine

ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .

RUN yarn build

ENTRYPOINT ["yarn", "start:prod"]
