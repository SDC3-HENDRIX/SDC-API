FROM node:lts-buster

# App Dir
WORKDIR /usr/src/app

COPY package*.json ./

RUN chown -R node:node /usr/src/app
RUN npm install
ENV NODE_ENV=development
ENV PORT=3000

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]
USER node