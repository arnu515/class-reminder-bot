FROM node:14

RUN mkdir /app

WORKDIR /app

COPY package* ./

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV production

ENTRYPOINT [ "npm", "start" ]
