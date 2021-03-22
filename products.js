const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const router = express.Router();

const productsEndpoint = {
  target: 'http://localhost:3010',
  changeOrigin: true,
};

// by default just forward everything
router.use(createProxyMiddleware(productsEndpoint));

module.exports = router;
