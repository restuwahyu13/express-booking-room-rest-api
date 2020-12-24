# install latest node version
FROM node:14.15.3-alpine

# create and set current working directory
RUN mkdir -p /app
WORKDIR /app

# copy package.json to current working directory
COPY package*.json ./

# install all package && install knex global
RUN npm install --production \
  && npm i -g knex

# copy all file to current working directory
COPY . ./

# expose container port
EXPOSE 3000

# change permission
RUN chmod 777 ./scripts/start.sh

# execute command
CMD ./scripts/start.sh