const {
    Book
} = require('@/models/book');
const { Op } = require("sequelize");
const sequelize = require("sequelize");
module.exports = {

    async list (ctx, next) {
        const rows = await Book.findAll();
        ctx.body = {
            msg: "OK",
            code: "0000",
            data: rows,
            request: `${ctx.method} ${ctx.path}`
        };
        ctx.status = 200

    },

    async add (ctx, next) {
        let article = JSON.parse(ctx.request.body)
        if (!Book.name) {
            ctx.body = {
                msg: '不能书名为空',
                code: '0000',
            }
            ctx.status = 400
        } else {
            await Book.create(article)
            ctx.body = {
                msg: '创建成功',
                code: '0000',
                isOk: true
            }
            ctx.status = 200

        }
    },

    async updata (ctx, next) {
        let p = JSON.parse(ctx.request.body);
        let f = await Book.findOne({
            where: {
                id: p.key
            }
        });
        if (!f) {
            ctx.body = {
                msg: '不存在图书',
                code: '0000',
            }
            ctx.status = 200
        } else {
            f.name = p.name
            f.url = p.url
            f.img = p.img
            await f.save()
            ctx.body = {
                msg: '更新成功',
                code: '0000',
                data: { isOk: true }

            }
            ctx.status = 200
        }

    },
    async del (ctx, next) {
        let co = JSON.parse(ctx.request.body)
        if (!co.id) {
            ctx.body = {
                msg: '参数不正确'
            }
            ctx.status = 400
        } else {
            let f = await Book.findOne({
                where: {
                    id: co.id
                }
            })
            if (!f) {
                ctx.body = {
                    msg: '不存在的书籍',
                    code: '0000'
                }
                ctx.status = 200
                return

            }
            await Book.destroy({
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

    }

};
