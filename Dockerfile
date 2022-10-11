FROM node:16.17.1-alpine
RUN mkdir /app && chown -R node:node /app
USER node
WORKDIR /app
 
COPY --chown=node . .
RUN npm install && npm run build

CMD [ "node", "build/index.js" ]

# npm@8.19.2