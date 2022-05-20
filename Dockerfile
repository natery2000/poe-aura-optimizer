FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY ./src ./src
COPY ./public ./public
COPY ./webpack.config.js ./
COPY ./.babelrc ./

EXPOSE 4000

CMD [ "npm", "start" ]