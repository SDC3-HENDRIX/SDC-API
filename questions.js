const router = require('express').Router;
const axios = require('axios');
const logger = require('./config/winston');
const { redisSet, redisGet } = require('./config/redis');

const destination = 'http://localhost:3020/qa/questions';

router.get('/qa/questions', (req, res) => {
  const { page = 1, count = 5, productId } = req.query;
  const key = `productId:${productId}:page${page}:count${count}`;

  return redisGet(key).then((results) => {
    if (results) {
      return res.send(JSON.parse(results));
    }
    return axios.get(`${destination}?product_id=${productId}&page=${page}&count=${count}`).then(({ data }) => {
      res.send(data);
      redisSet(key, JSON.stringify(data));
    })
      .catch((err) => {
        logger.error(err);
        res.status(500).send(`There was an error getting questions for product ${productId}`);
      });
  });
});
