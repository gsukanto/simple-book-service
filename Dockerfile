FROM node:10.16.0-alpine

EXPOSE 3000 3000

COPY . /home/app
WORKDIR /home/app
RUN npm install

CMD npm start