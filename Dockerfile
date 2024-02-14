FROM node:18.17.1

WORKDIR /usr/src/app

COPY . .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]