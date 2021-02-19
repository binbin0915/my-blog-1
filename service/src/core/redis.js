var Redis = require('ioredis');
var redis = new Redis({
  port: 6379,          // Redis port
  host: "",//production
  family: 4,           // 4 (IPv4) or 6 (IPv6)
  password: '',
  db: 0
})

module.exports = redis