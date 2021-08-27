FROM node:14.17.5
RUN apt update
RUN mkdir /www
RUN mkdir /www/lad-test-project
WORKDIR /www/lad-test-project
COPY . .
RUN npm install
RUN npm run build
ENTRYPOINT npm start