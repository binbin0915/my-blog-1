
const {
    Category
} = require('@/models/category');
const { Op, CIDR } = require("sequelize");
const redis = require('../core/redis')
module.exports = {
    async list(ctx, next) {
        const { xsource } = ctx;
        let rows;
        //ctx.logger.debug('categoryList的xsource值:', xsource, '\n')
        if (xsource === 'admin_system') {//后台管理系统不走redis
            rows = await Category.findAll();
        } else {//
            let categoryList = await redis.get('categoryList')
            if (categoryList) {
                rows = JSON.parse(categoryList)
            } else {
                rows = await Category.findAll();
                await redis.set('categoryList', JSON.stringify(rows))
                redis.expire('categoryList', 60);//60秒自动过期
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
    async add(ctx, next) {
        let ca = JSON.parse(ctx.request.body)
        let s = {};

        if (!ca.name || !ca.label) {
            ctx.body = {
                msg: '名字和label不能为空',
                code: '0000',
            }
            ctx.status = 400
        } else {
            const f = await Category.findOne({
                where: {
                    [Op.or]: [
                        { name: ca.name },
                        { label: ca.label },
                    ]
                }
            })

            if (f) {
                ctx.body = {
                    msg: '名字或者label已经存在',
                    code: '0000',
                }
                ctx.status = 200
            } else {
                s.name = ca.name;
                s.label = ca.label;
                s.weight = ca.weight || '1';
                await Category.create(s)
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
            await Category.destroy({
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

        if (!co.key || !co.name || !co.label) {
            ctx.body = {
                msg: "参数错误",
                code: '0000'
            }
            ctx.status = 200
        } else {

            let existName = await Category.findAll({
                where: {
                    [Op.or]: [
                        { name: co.name },
                        { label: co.label },
                    ],
                    id: {
                        [Op.not]: co.key,
                    }


                }
            })
            if (existName.length) {
                ctx.body = {
                    msg: '分类名字或者label已经存在'
                    ,
                    code: '0000'
                }
                ctx.status = 200
                return
            }

            let f = await Category.findOne({
                where: {
                    id: co.key
                }
            })
            if (!f) {
                ctx.body = {
                    msg: "分类不存在"
                }
                ctx.status = 400
            } else {

                f.name = co.name
                f.label = co.label
                f.weight = co.weight
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
