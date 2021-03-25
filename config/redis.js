const { promisify } = require('util');
const redis = require('redis');


const host = process.env.REDIS_HOST;
const password = process.env.REDIS_PASS;

const client = redis.createClient({
  host,
  password,

});

// export these as promises
exports.redisSet = promisify(client.set).bind(client);
exports.redisGet = promisify(client.get).bind(client);
