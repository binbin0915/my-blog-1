const bcrypt = require('bcryptjs')

const {
    sequelize
} = require('@/core/db')


const {
    Sequelize,
    Model
} = require('sequelize')

// define
class User extends Model {
    static async verifyEmailPassword (email, plainPassword) {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) {
            throw new global.errs.AuthFailed('账号不存在')
        }
        // user.password === plainPassword
        const correct = bcrypt.compareSync(
            plainPassword, user.password)
        if (!correct) {
            throw new global.errs.AuthFailed('密码不正确')
        }
        return user
    }

    static async getUserByOpenid (openid) {
        const user = await User.findOne({
            where: {
                openid
            }
        })
        return user
    }

    static async registerByOpenid (openid) {
        return await User.create({
            openid
        })
    }
}

//User.sync({ force: true });
module.exports = {
    User
}

// 数据迁移 SQL 更新 风险