
const { Model } = require('sequelize')

// define
class Book extends Model { }


//User.sync({ force: true });
module.exports = {
    Book
}

// 数据迁移 SQL 更新 风险