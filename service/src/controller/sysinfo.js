const {
    Sysinfo
} = require('@/models/sysinfo');
module.exports = {
    async info (ctx, next) {
        const rows = await Sysinfo.findAll();
        ctx.body = {
            msg: "OK",
            code: "0000",
            data: rows,
            request: `${ctx.method} ${ctx.path}`
        };
        ctx.status = 200
    },
    async updata (ctx, next) {
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
