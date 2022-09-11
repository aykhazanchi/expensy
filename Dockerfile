FROM node:16

WORKDIR /usr/src/app

COPY . .

COPY package.json ./

RUN npm install

RUN npx prisma migrate dev --name init

EXPOSE 3000

CMD ["node", "backend/server.js"]