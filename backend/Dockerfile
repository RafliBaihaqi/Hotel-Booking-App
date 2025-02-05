FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENV NODE_ENV=development

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]