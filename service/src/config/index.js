
let dev = {
    mysql: {
        dbName: 'dbName',
        host: '172.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
    },
    redis: {
        port: 6379,          // Redis port
        host: '172.0.0.1',   // Redis host
        family: 4,           // 4 (IPv4) or 6 (IPv6)
        password: '',
        db: 0
    },
    email: {
        //邮件配置
        service: 'QQ',
        user: '88888888@qq.com',
        pass: '88888888',
    }

}
let prod = {

}
module.exports = process.env.NODE_ENV === 'production' ? prod : dev