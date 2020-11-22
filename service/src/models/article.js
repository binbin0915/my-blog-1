
const { Model } = require('sequelize')

class Article extends Model { }


//User.sync({ force: true });
module.exports = {
    Article
}

// 数据迁移 SQL 更新 风险