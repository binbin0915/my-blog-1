const conf = require('../../mysql') || {}
module.exports = {
    dbName: 'DB',
    host: '172.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    ...conf
}