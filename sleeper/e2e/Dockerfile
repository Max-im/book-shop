FROM node:alpine AS e2e

WORKDIR /usr/src/app

COPY . .

RUN npm i

CMD ["npm", "run", "test"]