FROM node:19-alpine
ARG REACT_APP_EXZBT_API_URL
WORKDIR /client
ENV PATH /client/node_modules/.bin:$PATH
ENV REACT_APP_EXZBT_API_URL=$REACT_APP_EXZBT_API_URL
COPY package*.json .
RUN npm install --silent
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]