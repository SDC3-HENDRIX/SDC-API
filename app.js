const express = require('express');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const logger = require('./util/winston');

const app = express();
const port = process.env.PORT || 3000;
const proxyTable = {
  'localhost:3000/products': 'http://localhost:3010',
  'localhost:3000/qa': 'http://localhost:3020',
  'localhost:3000/reviews': 'http://localhost:3030',
};
const options = {
  target: 'http://localhost:3000',
  router: proxyTable,
  changeOrigin: true,
};

app.use(morgan('combined', { stream: logger.stream }));
// proxy routes
app.use(createProxyMiddleware(options));
app.listen(port);
app.get('/loaderio-1d381886955d5f81d33795ea3f08b9d8', (req, res) => {
  res.send('loaderio-1d381886955d5f81d33795ea3f08b9d8');
});
