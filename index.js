const convertSvgToPng = require("convert-svg-to-png");
const express = require("express");
const bodyParser = require("body-parser");
const getImageSize = require('./getImageSize')
const createSvg = require('./createSvg')
const createSvg2x = require('./createSvg2x')

const IMG_WIDTH = 600

const serverPort = process.env.PORT || 80 ;
const app = express();
const converter = convertSvgToPng.createConverter({
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});
app.use(bodyParser.text({
  type: 'application/json',
  limit: '2mb',
}));

app.get('/preview.svg', async (req, res) => {
  try {
    const image = {
      url: 'https://images.unsplash.com/photo-1571586100122-0869bd6e77c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80'
    }
    const colors = {
      title: '#030303',
      text: '#333',
    }
    const svg = createSvg2x('Average length blog post title goes here', 'Jan 13th, 2019', image, colors)

    res.set('Content-Type', 'image/svg+xml');
    res.send(svg);
  } catch (e) {
    res.status(500).send(e.message);
    console.log('error', e);
  }
});

app.post('/convert', async (req, res) => {
  try {
    const options = {};

    options.background = req.query.background || '#fff';
    options.baseUrl = req.query.baseUrl || 'file:///app';
    options.scale = req.query.scale || 1;

    if (req.query.baseFile) options.baseFile = req.query.baseFile;
    if (req.query.height) options.height = req.query.height;
    if (req.query.width) options.width = req.query.width;

    const data = JSON.parse(req.body);

    if (data.image) {
      const size = await getImageSize(data.image.url)
      const setHeight = (IMG_WIDTH / size.width) * size.height
      data.image.height = setHeight
    }

    const svg = createSvg2x(data.title, data.subtitle, data.image, data.colors)
    const png = await converter.convert(svg, options)

    res.set('Content-Type', 'image/png');
    res.send(png);
  } catch (e) {
    res.status(500).send(e.message);
    console.log('error', e);
  }
});

const server = app.listen(serverPort);

// HTTP Keep-Alive to a short time to allow graceful shutdown
server.on('connection', function (socket) {
  socket.setTimeout(5 * 1000);
});

const shutdown = async () => {
  console.log('graceful shutdown puppeteer');
  await converter.destroy();
  console.log('graceful shutdown express');
  server.close(function () {
    console.log('closed express');
    process.exit();
  });
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

console.log('Running server: http://0.0.0.0:' + serverPort);
