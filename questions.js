const express = require('express');
const axios = require('axios');
const { createProxyMiddleware } = require('http-proxy-middleware');
const logger = require('./config/winston');
const { redisSet, redisGet } = require('./config/redis');

const router = express.Router();
const destination = 'http://host.docker.internal:3020';
const options = {
  target: destination,
  changeOrigin: true,
};

// /qa/questions
router.get('/questions', (req, res) => {
  const { page = 1, count = 5, productId } = req.query;
  const key = `productId:${productId}:page${page}:count${count}`;

  return redisGet(key).then((results) => {
    if (results) {
      return res.send(JSON.parse(results));
    }
    return axios.get(`${destination}/qa/questions?product_id=${productId}&page=${page}&count=${count}`).then(({ data }) => {
      res.send(data);
      return redisSet(key, JSON.stringify(data));
    })
      .catch((err) => {
        logger.error(err);
        res.status(500).send(`There was an error getting questions for product ${productId}`);
      });
  });
});

// /qa/questions/:question_id
router.get('/questions/:question_id/answers', (req, res) => {
  const questionId = req.params.question_id;
  const key = `question:${questionId}`;
  return redisGet(key).then((results) => {
    if (results) {
      return res.send(JSON.parse(results));
    }

    return axios.get(`${destination}/qa/questions/${questionId}/answers`).then(({ data }) => {
      res.send(data);
      return redisSet(key, JSON.stringify(data));
    })
      .catch((err) => {
        logger.error(err);
        res.status(500).send(`There was an error getting answers for question ${questionId}`);
      });
  });
});

router.post('/questions*', createProxyMiddleware(options));
router.put('/questions*', createProxyMiddleware(options));
router.put('/answers*', createProxyMiddleware(options));

module.exports = router;
