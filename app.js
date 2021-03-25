const express = require('express');
const morgan = require('morgan');
const cluster = require('cluster');
const compression = require('compression');
const numCPUs = require('os').cpus().length;
const products = require('./products');
const questions = require('./questions');
const reviews = require('./reviews');
const logger = require('./config/winston');

const app = express();
const port = process.env.PORT;

app.use(morgan('combined', { stream: logger.stream }));
app.use(compression());

// proxy routes
app.use('/products', products);
// app.use('/qa', questions);
// app.use('/reviews', reviews);

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    logger.info(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  app.listen(port);
}

// API key for loader.io
app.get('/loaderio-cc6341b7f5678d3e2579c9a1e733a07e', (req, res) => {
  res.send('loaderio-cc6341b7f5678d3e2579c9a1e733a07e');
});
