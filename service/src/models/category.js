const { Sequelize, Model } = require('sequelize')

// define
class Category extends Model { }

//User.sync({ force: true });
module.exports = {
    Category
}
