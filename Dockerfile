FROM node:16-alpine
WORKDIR /app
COPY wiki-app-front/wiki-app/package*.json ./
RUN npm install
COPY wiki-app-front/wiki-app .
RUN npm run build
EXPOSE 3000
CMD ["npx", "serve", "-s", "build", "-l", "3000"]