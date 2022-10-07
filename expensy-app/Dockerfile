FROM node:16

WORKDIR /usr/src/app

COPY . .

COPY package.json ./

RUN npm install

#RUN npx prisma migrate deploy

EXPOSE 8080

EXPOSE 3306

CMD ["node", "backend/server.js"]
