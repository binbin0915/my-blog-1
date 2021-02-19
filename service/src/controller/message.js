const {
    Message
} = require('@/models/message');
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const dayjs = require('dayjs')
const { sendMail,
    htmlFn } = require('@/utils/mail')
module.exports = {

    async list(ctx, next) {

        const { page, size } = JSON.parse(ctx.request.body);
        if (!page && !size) {
            const rows = await Message.findAll({
                where: {
                    order: [[sequelize.literal('id'), 'DESC']],
                },
            });

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
        } else {
            let reg = /\d/
            if (reg.test(page) || reg.test(size)) {
                const { count, rows } = await Message.findAndCountAll({
                    //DESC 降序
                    //ASC 升序
                    order: [[sequelize.literal('id'), 'DESC']],
                    offset: (page - 1) * size,
                    limit: size
                })

                ctx.body = {
                    msg: "OK",
                    code: "0000",
                    data: {
                        count,
                        rows
                    },
                    request: `${ctx.method} ${ctx.path}`
                };
                ctx.status = 200
            } else {
                ctx.body = {
                    msg: "参数格式不正确！",
                    code: '0000',
                }
                ctx.status = 400
            }
        }
    },
    async add(ctx, next) {
        let message = JSON.parse(ctx.request.body)
        let s = {};

        if (!message.name || !message.content || !message.email) {
            ctx.body = {
                msg: '字段不能为空',
                code: '0000',
            }
            ctx.status = 400
        } else {
            s.name = message.name;
            s.content = message.content;
            s.email = message.email;
            s.ua = message.ua;
            s.ip = message.ip;
            s.created_time = new Date;
            let res = await Message.create(s)

            ctx.body = {
                msg: '创建成功',
                code: '0000',
                isOk: true
            }
            ctx.status = 200
        }
    },

    async updata(ctx, next) {
        let message = JSON.parse(ctx.request.body);
        message = {
            ...message,
            repay_at: new Date
        }
        let f = await Message.findOne({
            where: {
                id: message.id
            }
        })
        if (!f) {
            ctx.body = {
                msg: '不存在的留言',
                code: '0000'
            }
            ctx.status = 200
            return
        } else {
            if (!f.reply) {
                sendMail(
                    f.email,
                    '博客留言回复',
                    htmlFn(f.content, message.reply)
                )
            }
            await Message.update(message, {
                where: {
                    id: message.id
                }
            });
            ctx.body = {
                msg: '更新成功',
                code: '0000',
                data: { isOk: true }
            }
            ctx.status = 200
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
            let f = await Message.findOne({
                where: {
                    id: co.id
                }
            })
            if (!f) {
                ctx.body = {
                    msg: '不存在的留言',
                    code: '0000'
                }
                ctx.status = 200
                return
            }
            await Message.destroy({
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
