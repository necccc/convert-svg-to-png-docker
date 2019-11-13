FROM pluswerk/puppeteer

WORKDIR /app

COPY . /app/

RUN npm install

CMD ["node", "index.js"]

EXPOSE 80
