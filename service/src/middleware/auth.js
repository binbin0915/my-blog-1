
const {
    User
} = require('@/models/user')

module.exports = () => async (ctx, next) => {
    const { originalUrl } = ctx;
    let whiteList = [
        '/article/detail', '/article/read', '/article/list',
        '/article/recentArticle', '/article/search',
        '/article/archives',
        '/article/publishList',
        //
        '/book/list',
        //
        '/category/list',
        '/sysinfo/info',
        '/tags/list',
        '/tags/tagArticle',
        //
        '/user/regist',
        '/user/login',
        //
        '/message/add',
        '/message/list'
    ];
    let authList = [
        '/article/searchAll', '/article/add', '/article/updata', '/article/del',
        '/book/add', '/book/updata', '/book/del',
        '/category/add', '/category/del', '/category/updata',
        '/sysinfo/updata',
        '/tags/add', '/tags/del', '/tags/updata',
        '/user/getuserinfo', '/user/updatainfo',
        '/message/updata', '/message/del'
    ];
    let adminList = [
        '/article/add', '/article/updata', '/article/del',
        '/book/add', '/book/updata', '/book/del',
        '/category/add', '/category/del', '/category/updata',
        '/sysinfo/updata',
        '/tags/add', '/tags/del', '/tags/updata',
        '/message/updata', '/message/del'
    ];
    const { token, xsource } = ctx.header;
    // ctx.logger.debug('auth获取header头的token:', token)
    // ctx.logger.debug('auth获取header头的xsource:', xsource, '\n')
    if (xsource) {
        ctx.xsource = xsource
    }
    if (whiteList.includes(originalUrl)) {
        await next();
        return
    }

    const f = await User.findOne({
        where: {
            token
        }
    });
    if (authList.includes(originalUrl)) {
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
            if (adminList.includes(originalUrl)) {
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
            } else {
                await next()
            }

        }
    }

};
