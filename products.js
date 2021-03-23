const express = require('express');
const axios = require('axios');
const logger = require('./config/winston');
const { redisSet, redisGet } = require('./config/redis');

const router = express.Router();
// destination for products node instance
const destination = process.env.NODE_ENV === 'production' ? 'http://ip-172-31-84-78.ec2.internal:3010' : 'http://localhost:3010';

router.get('/', (req, res) => {
  let { page, count, test } = req.query;

  if (test === 'true') {
    page = Math.floor(Math.random() * 1000);
    count = Math.floor(Math.random() * 1000);
  } else {
    page = Number(req.query.page) || 1;
    count = Number(req.query.count) || 5;
  }

  const key = `page:${page}:count:${count}`;
  // this is a promise
  return redisGet(key).then((result) => {
    if (result) {
      return res.send(JSON.parse(result));
    }

    return axios.get(`${destination}/products?page=${page}&count=${count}`)
      .then(({ data }) => {
        res.send(data);
        return redisSet(key, JSON.stringify(data));
      })
      .catch((err) => {
        logger.error(err);
        res.status(500).send('There was an error getting products');
      });
  });
});

// get one product from the endpoint
router.get('/:product_id', (req, res) => {
  let productId;

  if (req.query.test === 'true') {
    productId = Math.floor(Math.random() * 100002) + 900009;
  } else {
    productId = req.params.product_id;
  }

  const key = `product:${productId}`;
  return redisGet(key).then((result) => {
    if (result !== null) {
      return res.send(JSON.parse(result));
    }

    return axios.get(`${destination}/products/${productId}`)
      .then(({ data }) => {
        res.status(200).send(data);
        return redisSet(key, JSON.stringify(data));
      })
      .catch((err) => {
        res.status(500).send(`There was an error getting ${productId}`);
        logger.error(err);
      });
  });
});

router.get('/:product_id/styles', (req, res) => {
  let productId;

  if (req.query.test === 'true') {
    productId = Math.floor(Math.random() * 100002) + 900009;
  } else {
    productId = req.params.product_id;
  }

  const key = `product:${productId}:styles`;

  return redisGet(key).then((result) => {
    if (result !== null) {
      return res.send(JSON.parse(result));
    }
    return axios.get(`${destination}/products/${productId}/styles`)
      .then(({ data }) => {
        res.status(200).send(data);
        return redisSet(key, JSON.stringify(data));
      })
      .catch((err) => {
        res.status(500).send(`There was an error getting styles for ${productId}`);
        logger.error(err);
      });
  });
});

router.get('/:product_id/related', (req, res) => {
  const productId = req.params.product_id;
  const key = `product:${productId}:related`;

  return redisGet(key).then((result) => {
    if (result !== null) {
      return res.send(JSON.parse(result));
    }
    return axios.get(`${destination}/products/${productId}/related`)
      .then(({ data }) => {
        res.status(200).send(data);
        return redisSet(key, JSON.stringify(data));
      })
      .catch((err) => {
        res.status(500).send(`There was an error getting related products for ${productId}`);
        logger.error(err);
      });
  });
});

module.exports = router;
