# BUILD STAGE ONE
FROM node:14-alpine AS build
WORKDIR /app
COPY package*.json .
RUN npm ci --prod \
  && npm i -g knex
COPY . .

#BUILD STAGE TWO
FROM build As lintfix
WORKDIR /app
COPY --from=build /app .
RUN npm run lint:fix

#BUILD STAGE THREE
FROM mhart/alpine-node:12
WORKDIR /app
COPY --from=lintfix /app .
RUN chmod 777 ./scripts/start.sh
EXPOSE 3000
CMD ./scripts/start.sh