const {
    Sysinfo
} = require('@/models/sysinfo');
const redis = require('../core/redis')

module.exports = {
    async info(ctx, next) {

        const { xsource } = ctx;
        let rows;
        if (xsource === 'admin_system') {//后台管理系统不走redis
            rows = await Sysinfo.findAll();
        } else {//
            let SysinfoList = await redis.get('SysinfoList')
            if (SysinfoList) {
                rows = JSON.parse(SysinfoList)
            } else {
                rows = await Sysinfo.findAll();
                await redis.set('SysinfoList', JSON.stringify(rows))
                redis.expire('SysinfoList', 60);//60秒自动过期
            }
        }
        ctx.body = {
            msg: "OK",
            code: "0000",
            data: rows,
            request: `${ctx.method} ${ctx.path}`
        };
        ctx.status = 200
    },
    async updata(ctx, next) {
        let p = JSON.parse(ctx.request.body);
        let f = await Sysinfo.findOne({
            where: {
                id: 1
            }
        });
        let res = f ? await Sysinfo.update(p, {
            where: {
                id: 1
            }
        }) : await Sysinfo.create(p)
        ctx.body = {
            msg: 'Ok',
            code: '0000',
            data: res
        }
        ctx.status = 200
    },
};
