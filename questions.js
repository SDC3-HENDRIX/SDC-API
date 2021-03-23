const router = require('express').Router;
const axios = require('axios');
const { createProxyMiddleware } = require('http-proxy-middleware');
const logger = require('./config/winston');
const { redisSet, redisGet } = require('./config/redis');

const destination = 'http://localhost:3020';
const options = {
  target: destination,
  changeOrigin: true,
};

router.get('/qa/questions', (req, res) => {
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

router.get('/qa/questions/:question_id/answers', (req, res) => {
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

router.post('/qa/questions*', createProxyMiddleware(options));
router.put('/qa/questions*', createProxyMiddleware(options));
router.put('/qa/answers*', createProxyMiddleware(options));

module.exports = router;
