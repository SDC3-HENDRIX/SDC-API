const express = require('express');
const morgan = require('morgan');
const products = require('./products');
const logger = require('./config/winston');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('combined', { stream: logger.stream }));

// proxy routes
app.use(products);

app.listen(port);

// API key for loader.io
app.get('/loaderio-1d381886955d5f81d33795ea3f08b9d8', (req, res) => {
  res.send('loaderio-1d381886955d5f81d33795ea3f08b9d8');
});
