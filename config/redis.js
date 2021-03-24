const { promisify } = require('util');
const redis = require('redis');

const client = redis.createClient({
  host: 'host.docker.internal',
});

// export these as promises
exports.redisSet = promisify(client.set).bind(client);
exports.redisGet = promisify(client.get).bind(client);
