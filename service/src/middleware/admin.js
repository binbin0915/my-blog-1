
module.exports = () => async (ctx, next) => {
    let f = ctx.f
    if (f.role == 'admin') {
        await next()
    } else {
        ctx.body = {
            msg: '权限不足，请联系管理员',
            code: "0002",
            data: null,
            request: `${ctx.method} ${ctx.path}`
        }
        ctx.status = 200
    }


};
