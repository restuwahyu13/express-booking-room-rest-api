#!/bin/sh

# if [ "$NODE_ENV" == "production" ]; then
#   npx knex migrate:latest
#   npm run start
# else
#   npx knex migrate:latest
#   npm run start:dev
# fi

npx knex migrate:latest
npm start
