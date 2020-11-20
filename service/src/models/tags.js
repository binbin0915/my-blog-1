
const {
    Sequelize,
    Model
} = require('sequelize')

// define
class Tags extends Model { }


//User.sync({ force: true });
module.exports = {
    Tags
}

// 数据迁移 SQL 更新 风险