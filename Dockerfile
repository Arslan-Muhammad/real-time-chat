FROM mhart/alpine-node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm rum build

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "dist/index.js"]