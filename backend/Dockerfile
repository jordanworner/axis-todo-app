FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY ./src ./src
COPY ./test ./test
COPY ./tsconfig.json ./tsconfig.json

RUN npm run build

EXPOSE 8081

CMD [ "node", "build/src/index.js" ]