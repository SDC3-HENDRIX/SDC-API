const express = require('express');
const morgan = require('morgan');
const products = require('./products');
const questions = require('./questions');
const reviews = require('./reviews');
const logger = require('./config/winston');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('combined', { stream: logger.stream }));

// proxy routes
app.use('/products', products);
app.use('/qa', questions);
app.use('/reviews', reviews);

app.listen(port);

// API key for loader.io
app.get('/loaderio-cc6341b7f5678d3e2579c9a1e733a07e', (req, res) => {
  res.send('loaderio-cc6341b7f5678d3e2579c9a1e733a07e');
});
