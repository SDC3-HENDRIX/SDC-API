const express = require('express');
const axios = require('axios');
const { createProxyMiddleware } = require('http-proxy-middleware');
const logger = require('./config/winston');
const { redisSet, redisGet } = require('./config/redis');

const router = express.Router();
const destination = process.env.REVIEWS_HOST || 'http://localhost:3030';
const options = {
  target: destination,
  changeOrigin: true,
};

router.get('/', (req, res) => {
  const {
    page = 1, count = 5, sort, productId = req.query.product_id,
  } = req.query;
  const key = `product:${productId}:page:${page}:count:${count}:sort:${sort}`;

  return redisGet(key).then((results) => {
    if (results) return res.send(JSON.parse(results));
    return axios.get(`${destination}/reviews`, {
      params: {
        page,
        count,
        sort,
        product_id: productId,
      },
    })
      .then(({ data }) => {
        res.send(data);
        return redisSet(key, JSON.stringify(data));
      })
      .catch((err) => {
        logger.error(err);
        res.status(500).send(`There was an error getting reviews for product ${productId}`);
      });
  });
});

router.get('/meta', (req, res) => {
  const productId = req.query.product_id;
  const key = `product:${productId}:meta`;

  return redisGet(key).then((result) => {
    if (result) return res.send(JSON.parse(result));
    return axios.get(`${destination}/reviews/meta?product_id=${productId}`).then(({ data }) => {
      res.send(data);
      return redisSet(key, JSON.stringify(data));
    })
      .catch((err) => {
        logger.error(err);
        res.status(500).send(`There was an error getting metadata for product ${productId}`);
      });
  });
});

router.post('/reviews*', createProxyMiddleware(options));
router.put('/reviews*', createProxyMiddleware(options));

module.exports = router;
