const express = require('express');
const app = express();
const port = 8080;

app.listen(port);

app.get('/', (req, res) => {
  res.status(200).send('Hello world!');
});
