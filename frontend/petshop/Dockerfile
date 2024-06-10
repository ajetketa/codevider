FROM node:21.7.3-alpine

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
COPY --chown=app:app package*.json ./
RUN npm install --silent
COPY . .

EXPOSE 3000

CMD ["npm", "start", "dev"]