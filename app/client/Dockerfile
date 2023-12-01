FROM node:19-alpine
WORKDIR /client
ENV PATH /client/node_modules/.bin:$PATH
COPY package*.json .
RUN npm i --install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]