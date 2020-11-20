const {
    Article
} = require('@/models/article');
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const dayjs = require('dayjs')
module.exports = {
    async detail (ctx, next) {
        /**
         * status 0 未发布 , 1发布, -1 删除
         */
        const res = await Article.findOne({
            where: {
                id: 1
            },
        });
        ctx.body = {
            msg: "OK",
            code: "0000",
            data: res,
            request: `${ctx.method} ${ctx.path}`
        };
        ctx.status = 200
    },
    async list (ctx, next) {
        /**
         * status 0 未发布 , 1发布, -1 删除
         */
        const { page, size } = JSON.parse(ctx.request.body);
        if (!page && !size) {
            const rows = await Article.findAll({
                where: {
                    order: [[sequelize.literal('id'), 'DESC']],
                    [Op.or]: [
                        { status: '0' },
                        { status: '1' }
                    ]
                },
            });
            rows.forEach(d => {
                d.tag_ids = (d.tag_ids || '').split(',').filter(Boolean)
            })
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
                const { count, rows } = await Article.findAndCountAll({
                    //DESC 降序
                    //ASC 升序
                    order: [[sequelize.literal('id'), 'DESC']],
                    where: {
                        [Op.or]: [
                            { status: '0' },
                            { status: '1' }
                        ],
                    },
                    offset: (page - 1) * size,
                    limit: size
                })
                rows.forEach(d => {
                    d.tag_ids = (d.tag_ids || '').split(',').filter(Boolean)
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
    async publishList (ctx, next) {
        /**
         * status 0 未发布 , 1发布, -1 删除
         */
        const { page, size } = JSON.parse(ctx.request.body);
        if (!page && !size) {
            const rows = await Article.findAll({
                order: [[sequelize.literal('publish_time'), 'DESC']],
                where: {
                    [Op.or]: [
                        { published: '1' }
                    ]
                },
            });
            ctx.body = {
                msg: "OK",
                code: "0000",
                data: {
                    count: rows.length,
                    rows: rows.map(d => {
                        return {
                            id: d.id,
                            covery_img: d.covery_img,
                            summary: d.summary,
                            title: d.title,
                            tag_ids: d.tag_ids || '',
                            category_id: d.category_id,
                            publish_time: d.publish_time

                        }
                    })
                },
                request: `${ctx.method} ${ctx.path}`
            };
            ctx.status = 200
        } else {
            let reg = /\d/
            if (reg.test(page) || reg.test(size)) {
                const { count, rows } = await Article.findAndCountAll({
                    order: [[sequelize.literal('publish_time'), 'DESC']],
                    where: {
                        [Op.or]: [
                            { published: '1' }
                        ]
                    },
                    offset: (page - 1) * size,
                    limit: size
                })
                ctx.body = {
                    msg: "OK",
                    code: "0000",
                    data: {
                        count,
                        rows: rows.map(d => {
                            return {
                                id: d.id,
                                covery_img: d.covery_img,
                                summary: d.summary,
                                title: d.title,
                                tag_ids: d.tag_ids || '',
                                category_id: d.category_id,
                                publish_time: d.publish_time

                            }
                        })
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
    async archives (ctx) {
        const rows = await Article.findAll({
            order: [[sequelize.literal('publish_time'), 'DESC']],
            where: {
                [Op.or]: [
                    { published: '1' }
                ]
            },
        });
        let temp = [];
        rows.forEach(d => {
            let obj = {
                id: d.id,
                publish_time: d.publish_time,
                title: d.title,
                year: dayjs(d.publish_time).format('YYYY'),
                month: dayjs(d.publish_time).format('MM'),
                day: dayjs(d.publish_time).format('DD'),
            }
            temp.push(obj)
        })
        ctx.body = {
            msg: 'OK',
            code: '0000',
            data: temp
        }

        ctx.status = 200

    },
    async add (ctx, next) {
        let article = JSON.parse(ctx.request.body)
        let s = {};

        if (!article.title) {
            ctx.body = {
                msg: '标题不能为空',
                code: '0000',
            }
            ctx.status = 400
        } else {
            s.title = article.title;
            s.content = article.content;
            s.covery_img = article.covery_img;
            s.img2 = article.img2;
            s.summary = article.summary;
            s.published = article.published;
            s.read_nums = article.read_nums;
            s.publish_time = new Date;
            s.wight = article.wight;
            s.status = article.status;
            s.tag_ids = article.tag_ids.join(',');
            s.category_id = article.category_id;
            s.b1 = article.b1;
            s.b2 = article.b2;
            Article.create(s)
            ctx.body = {
                msg: '创建成功',
                code: '0000',

            }
            ctx.status = 200
        }
    },
    async publish (ctx, next) {
        let article = ctx.request.body
        if (!article.title) {
            ctx.body = {
                msg: '标题不能为空',
                code: '0000',
            }
            ctx.status = 200
        } else {
            Article.create(article)
        }

    },
    async updata (ctx, next) {
        let article = JSON.parse(ctx.request.body);
        let f = await Article.findOne({
            where: {
                id: article.id
            }
        });
        if (!f) {
            ctx.body = {
                msg: '不存在的文章',
                code: '0000',
            }
            ctx.status = 200
        } else {
            if (f.published == '0' && article.published == '1') {
                article.publish_time = new Date
            }
            article.tag_ids = article.tag_ids.join(',')
            await Article.update(article, {
                where: {
                    id: article.id
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
    async del (ctx, next) {
        let co = JSON.parse(ctx.request.body)
        if (!co.id) {
            ctx.body = {
                msg: '参数不正确'
            }
            ctx.status = 400
        } else {
            let f = await Article.findOne({
                where: {
                    id: co.id
                }
            })
            if (!f) {
                ctx.body = {
                    msg: '不存在的文章',
                    code: '0000'
                }
                ctx.status = 200
                return

            }
            await Article.destroy({
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
