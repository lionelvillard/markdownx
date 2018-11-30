FROM node:8-alpine

WORKDIR /

COPY bin/ bin/  
COPY lib/ lib/  
COPY package.json .

RUN npm install

ENTRYPOINT ["bin/markdownx.js"]
