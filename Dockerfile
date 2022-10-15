FROM node:16.17.1-alpine
RUN  npm install npm -g  && \
    mkdir /app && chown -R node:node /app && \
    mkdir /.npm /.config && chmod 777 /.npm /.config

USER node
WORKDIR /app
COPY package.json /app 
RUN npm install --verbose
COPY --chown=node . .

