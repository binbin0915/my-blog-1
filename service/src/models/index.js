const { User } = require('@/models/user')
const { Tags } = require('@/models/tags')
const { Article } = require('@/models/article')
const { ArticleTag } = require('@/models/article_tag')
const { Book } = require('@/models/book')
const { Message } = require('@/models/message')
const { Sysinfo } = require('@/models/sysinfo')
const { Category } = require('@/models/category')
const { db, db2 } = require('@/core/db')
const { Sequelize } = require('sequelize')
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
        sequelize: db2,
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
    Sysinfo.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        logo: Sequelize.STRING,
        ico: Sequelize.TEXT,
        meta_keyword: Sequelize.TEXT,
        meta_description: Sequelize.TEXT,
        av: Sequelize.STRING,
        name: Sequelize.STRING,
        discribe: Sequelize.STRING,
        github: Sequelize.STRING,
        email: Sequelize.STRING,
        footer: Sequelize.TEXT,
        aboutme: Sequelize.TEXT,
        b2: Sequelize.STRING,
        b3: Sequelize.STRING,
        b4: Sequelize.STRING,
        b5: Sequelize.STRING,
    }, {
        sequelize: db,
        tableName: 'sysinfo'
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
    Message.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        content: Sequelize.TEXT,
        reply: Sequelize.TEXT,
        created_time: Sequelize.DATE,
        repay_at: Sequelize.DATE,
        ua: Sequelize.TEXT,
        ip: Sequelize.STRING,
        is_show: Sequelize.STRING,
        article_id: Sequelize.STRING,
    }, {
        sequelize: db,
        tableName: 'message'
    })
}


module.exports = {
    init
}
