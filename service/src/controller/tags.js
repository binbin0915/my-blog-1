
const {
    Tags
} = require('@/models/tags');
const {
    ArticleTag
} = require('@/models/article_tag');
const { Op, CIDR } = require("sequelize");
const redis = require('../core/redis')

module.exports = {
    async list(ctx, next) {
        const { xsource } = ctx;
        let rows;
        if (xsource === 'admin_system') {//后台管理系统不走redis
            rows = await Tags.findAll();
        } else {//
            let tagList = await redis.get('tagList')
            if (tagList) {
                rows = JSON.parse(tagList)
            } else {
                rows = await Tags.findAll();
                await redis.set('tagList', JSON.stringify(rows))
                redis.expire('tagList', 60);//60秒自动过期

            }
        }
        ctx.body = {
            msg: "OK",
            code: "0000",
            data: {
                count: rows.length,
                rows
            },
            request: `${ctx.method} ${ctx.path}`
        };
        ctx.status = 200
    },
    async tag_article(ctx, next) {
        const rows = await ArticleTag.findAll();
        ctx.body = {
            msg: "OK",
            code: "0000",
            data: rows,
            request: `${ctx.method} ${ctx.path}`
        };
        ctx.status = 200
    },
    async add(ctx, next) {
        let ca = JSON.parse(ctx.request.body)
        let s = {};

        if (!ca.name) {
            ctx.body = {
                msg: '名字不能为空',
                code: '0000',
            }
            ctx.status = 400
        } else {
            const f = await Tags.findOne({
                where: {
                    name: ca.name
                }
            })

            if (f) {
                ctx.body = {
                    msg: '名字已经存在',
                    code: '0000',
                }
                ctx.status = 200
            } else {
                s.name = ca.name;
                s.color = ca.color || '';
                await Tags.create(s)
                ctx.body = {
                    msg: '创建成功',
                    code: '0000',
                    data: { isOk: true }

                }
                ctx.status = 200
            }

        }
    },
    async del(ctx, next) {
        let co = JSON.parse(ctx.request.body)
        if (!co.id) {
            ctx.body = {
                msg: '参数不正确'
            }
            ctx.status = 400
        } else {
            await Tags.destroy({
                truncate: true,
                where: {
                    id: co.id
                }
            });

            ctx.body = {
                msg: 'OK',
                data: {
                    isOk: true
                },
                code: '0000'
            }
            ctx.status = 200


        }

    },
    async updata(ctx, next) {
        let co = JSON.parse(ctx.request.body)

        if (!co.key || !co.name) {
            ctx.body = {
                msg: "参数错误"
            }
            ctx.status = 400
        } else {
            let f = await Tags.findOne({
                where: {
                    id: co.key
                }
            })
            let existName = await Tags.findOne({
                where: {
                    name: co.name
                },
                [Op.not]: [{
                    id: co.key
                }]

            })
            if (existName && existName.id !== co.key) {
                ctx.body = {
                    msg: '分类名字已经存在',
                    code: '0000'
                }
                ctx.status = 200
                return
            }
            if (!f) {
                ctx.body = {
                    msg: "分类不存在"
                }
                ctx.status = 400
            } else {

                f.name = co.name
                f.color = co.color
                f.save()
                ctx.body = {
                    msg: "OK",
                    code: '0000',
                    data: { isOk: true }
                }
                ctx.status = 200
            }
        }


    }


};
