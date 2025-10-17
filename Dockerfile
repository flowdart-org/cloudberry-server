FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY package.json ./

RUN pnpm run install

COPY . .

CMD ["pnpm", "run", "start:dev"]
