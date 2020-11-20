
const {
    User
} = require('@/models/user')

module.exports = () => async (ctx, next) => {
    const { token } = ctx.header
    const f = await User.findOne({
        where: {
            token
        }
    })
    if (!f) {
        ctx.body = {
            msg: '登录信息失效',
            code: "0001",
            data: null,
            request: `${ctx.method} ${ctx.path}`
        }
        ctx.status = 200
    } else {
        ctx.f = f
        next()
    }

};
