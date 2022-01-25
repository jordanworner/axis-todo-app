FROM node:16-alpine

ARG VITE_API_URL
ENV VITE_API_URL $VITE_API_URL

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY ./src ./src
COPY ./index.html ./index.html
COPY ./postcss.config.js ./postcss.config.js
COPY ./tailwind.config.js ./tailwind.config.js
COPY ./vite.config.ts ./vite.config.ts
COPY ./tsconfig.json ./tsconfig.json

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "preview" ]