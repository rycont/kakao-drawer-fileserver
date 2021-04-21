FROM node:14
COPY . .
RUN npm i
CMD npm run start