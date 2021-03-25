FROM node:lts-alpine

# App Dir
WORKDIR /usr/src/app

COPY package*.json ./

RUN chown -R node:node /usr/src/app
RUN npm install --production

COPY . .

CMD [ "node", "app.js" ]
USER node