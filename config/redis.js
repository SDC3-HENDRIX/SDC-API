const { promisify } = require('util');
const redis = require('redis');

const hostname = process.env.REDIS_HOST;

const client = redis.createClient({
  host: hostname,
});

// export these as promises
exports.redisSet = promisify(client.set).bind(client);
exports.redisGet = promisify(client.get).bind(client);
