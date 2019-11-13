const convertSvgToPng = require("convert-svg-to-png");
const express = require("express");
const bodyParser = require("body-parser");
const getImageSize = require('./getImageSize')
const createSvg = require('./createSvg')

const IMG_WIDTH = 600

const serverPort = 3000;
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

    const svg = createSvg('Post title', 'Subtitle text')

    res.set('Content-Type', 'image/svg+xml');
    res.send(createSvg('Post title', 'Subtitle text'));
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

    const size = await getImageSize(data.image.url)
    const setHeight = (IMG_WIDTH / size.width) * size.height
    data.image.height = setHeight

    const png = await converter.convert(createSvg(data.title, data.subtitle, data.image), options);
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
