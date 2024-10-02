FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package*.json .
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
COPY apps/notification apps/notification
COPY libs libs

RUN npm i
RUN cd apps/notification && npm i

RUN npm run build notification

FROM node:alpine AS production

ARG NODE_ENV=production

ENV NODE_ENV={NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json .

RUN npm i --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/notification/main"]
