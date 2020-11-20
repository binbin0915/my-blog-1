const { HttpException } = require('@/core/http-exception')
module.exports = () => async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        ctx.logger.error(error)
        const isHttpException = error instanceof HttpException
        if (isHttpException) {
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        }
        else {
            ctx.body = {
                msg: 'we made a mistake O(∩_∩)O~~',
                error_code: 999,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    }
};
