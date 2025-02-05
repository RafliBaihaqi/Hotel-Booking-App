FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm build

EXPOSE 5000

CMD ["npm", "start"]