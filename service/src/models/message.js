
const { Model } = require('sequelize')

// define
class Message extends Model { }


//User.sync({ force: true });
module.exports = {
    Message
}

// 数据迁移 SQL 更新 风险