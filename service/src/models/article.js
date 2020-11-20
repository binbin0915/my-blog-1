const bcrypt = require('bcryptjs')

const {
    sequelize
} = require('@/core/db')


const {
    Sequelize,
    Model
} = require('sequelize')

// define
class Article extends Model { }


//User.sync({ force: true });
module.exports = {
    Article
}

// 数据迁移 SQL 更新 风险