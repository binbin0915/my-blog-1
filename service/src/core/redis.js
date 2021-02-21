var Redis = require('ioredis');
var config = require('@/config/index.js').redis
var redis = new Redis(config)

module.exports = redis