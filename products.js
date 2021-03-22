const express = require('express');
const axios = require('axios');
const logger = require('./config/winston');
const { redisSet, redisGet } = require('./config/redis');

const router = express.Router();

const destination = 'http://localhost:3010';
// by default just forward everything
// router.use(createProxyMiddleware(productsEndpoint));

router.get('/products', (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  const key = `page:${page}:count:${count}`;

  return redisGet(key).then((result) => {
    if (result) {
      res.status(200).send(JSON.parse(result));
    } else {
      return axios.get(`${destination}/products?page=${page}&count=${count}`)
        .then(({ data }) => {
          res.send(data);
          return redisSet(key, JSON.stringify(data));
        })
        .catch((err) => logger.error(err));
    }
  });
});

// get products from the endpoint
// get one product from the endpoint
router.get('/products/:product_id', (req, res) => {
  const productId = req.params.product_id;
  const key = `product:${productId}`;

  if (productId) {
    return redisGet(key).then((result) => {
      if (result !== null) {
        res.status(200).send(JSON.parse(result));
      } else {
        return axios.get(`${destination}/products/${productId}`)
          .then(({ data }) => {
            res.status(200).send(data);
            return redisSet(key, JSON.stringify(data));
          })
          .catch((err) => logger.error(err));
      }
    });
  }
});

router.get('/products/:product_id/styles', (req, res) => {
  const productId = req.params.product_id;
  const key = `product:${productId}:styles`;

  if (productId) {
    return redisGet(key).then((result) => {
      if (result !== null) {
        res.status(200).send(JSON.parse(result));
      } else {
        return axios.get(`${destination}/products/${productId}/styles`)
          .then(({ data }) => {
            res.status(200).send(data);
            return redisSet(key, JSON.stringify(data));
          })
          .catch((err) => logger.error(err));
      }
    });
  }
});

router.get('/products/:product_id/related', (req, res) => {
  const productId = req.params.product_id;
  const key = `product:${productId}:related`;

  if (productId) {
    return redisGet(key).then((result) => {
      if (result !== null) {
        res.status(200).send(JSON.parse(result));
      } else {
        return axios.get(`${destination}/products/${productId}/related`)
          .then(({ data }) => {
            res.status(200).send(data);
            return redisSet(key, JSON.stringify(data));
          })
          .catch((err) => logger.error(err));
      }
    });
  }
});

module.exports = router;
