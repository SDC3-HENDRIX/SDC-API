const { promisify } = require('util');
const redis = require('redis');

const client = redis.createClient({
  host: '127.0.0.1',
});

exports.redisSet = promisify(client.set).bind(client);
exports.redisGet = promisify(client.get).bind(client);
