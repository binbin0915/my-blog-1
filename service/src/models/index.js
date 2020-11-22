const { User } = require('@/models/user')
const { Tags } = require('@/models/tags')
const { Article } = require('@/models/article')
const { ArticleTag } = require('@/models/article_tag')
const { Book } = require('@/models/book')
const { Category } = require('@/models/category')
const { db } = require('@/core/db')
const { Sequelize, Model } = require('sequelize')
const bcrypt = require('bcryptjs')
function init () {

    User.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nickname: Sequelize.STRING,
        username: Sequelize.STRING,
        token: Sequelize.STRING,
        role: Sequelize.STRING,
        status: Sequelize.STRING,
        email: {
            type: Sequelize.STRING(128),
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            set (val) {
                const salt = bcrypt.genSaltSync(10)
                const psw = bcrypt.hashSync(val, salt)
                this.setDataValue('password', psw)
            }
        },
    }, {
        sequelize: db,
        tableName: 'user'
    })

    Tags.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        label: Sequelize.STRING,
        name: Sequelize.STRING,
        weight: Sequelize.STRING,
        color: Sequelize.STRING,
    }, {
        sequelize: db,
        tableName: 'tags'
    })

    Article.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: Sequelize.STRING,
        content: Sequelize.TEXT,
        covery_img: Sequelize.STRING,
        img2: Sequelize.STRING,
        summary: Sequelize.STRING,
        published: Sequelize.STRING,
        publish_time: Sequelize.DATE,
        read_nums: Sequelize.STRING,
        weight: Sequelize.STRING,
        status: Sequelize.STRING,
        tag_ids: Sequelize.STRING,
        category_id: Sequelize.STRING,
        b1: Sequelize.STRING,
        b2: Sequelize.STRING,

    }, {
        sequelize: db,
        tableName: 'article'
    })
    ArticleTag.init({
        article_id: Sequelize.STRING,
        tag_id: Sequelize.STRING,
    }, {
        sequelize: db,
        tableName: 'article_tag'
    })

    Book.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: Sequelize.STRING,
        url: Sequelize.TEXT,
        img: Sequelize.STRING,
    }, {
        sequelize: db,
        tableName: 'book'
    })

    Category.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        label: Sequelize.STRING,
        name: Sequelize.STRING,
        weight: Sequelize.STRING,
    }, {
        sequelize: db,
        tableName: 'category'
    })
}


module.exports = {
    init
}
