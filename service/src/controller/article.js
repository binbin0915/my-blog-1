const {
    Article
} = require('@/models/article');
const { ArticleTag } = require('@/models/article_tag')
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const dayjs = require('dayjs')
module.exports = {
    async detail (ctx, next) {
        /**
         * status 0 未发布 , 1发布, -1 删除
         */
        const { id } = JSON.parse(ctx.request.body);
        const res = await Article.findOne({
            where: {
                id
            },
        });
        if (res) {
            res.tag_ids = res.tag_ids ? res.tag_ids.split(',') : []

        }
        ctx.body = {
            msg: "OK",
            code: "0000",
            data: res ? res : null,
            request: `${ctx.method} ${ctx.path}`
        };

        ctx.status = 200
    },
    async read (ctx, next) {
        /**
         * status 0 未发布 , 1发布, -1 删除
         */
        const { id } = JSON.parse(ctx.request.body);
        const res = await Article.findOne({
            where: {
                id
            },
        });
        res.read_nums = (Number(res.read_nums) || 0) + 1;
        res.save()
        ctx.body = {
            msg: "OK",
            code: "0000",
            data: res ? res : null,
            request: `${ctx.method} ${ctx.path}`
        };

        ctx.status = 200
    },
    async list (ctx, next) {
        /**
         * status 0 未发布 , 1发布, -1 删除
         */
        const { page, size, filter } = JSON.parse(ctx.request.body);
        let whereObj = {}
        if (filter.title) {
            whereObj.title = {
                [Op.like]: '%' + filter.title + '%',
            }
        }
        if (filter.ca) {
            whereObj.category_id = filter.ca
        }
        if (filter.published == '0' || filter.published == '1') {
            whereObj.published = filter.published
        }
        if (!page && !size) {
            const rows = await Article.findAll({
                where: {
                    order: [[sequelize.literal('id'), 'DESC']],
                    [Op.or]: [
                        { status: '0' },
                        { status: '1' },

                    ],
                    ...whereObj
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
                        ...whereObj

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
    async recentArticle (ctx, next) {
        const rows = await Article.findAll({
            order: [[sequelize.literal('updated_at'), 'DESC']],
            where: {
                [Op.and]: [
                    { published: '1' }
                ]
            },
            offset: 0,
            limit: 10
        });
        let res = rows.map(d => ({
            id: d.id,
            title: d.title,
            updated_at: dayjs(d.updated_at).format('MM-DD HH:mm')
        }))
        ctx.body = {
            msg: 'OK',
            data: res,
            code: '0000'
        }
        ctx.status = 200
    },
    async searchAll (ctx, next) {
        /**
         * status 0 未发布 , 1发布, -1 删除
         */
        const { keyword } = JSON.parse(ctx.request.body);
        if (!keyword) {

            ctx.body = {
                msg: "搜索词不能为空！",
                code: "0000",
                data: null,
                request: `${ctx.method} ${ctx.path}`
            };
            ctx.status = 400
        } else {

            const res = await Article.findAll({
                //DESC 降序
                //ASC 升序
                order: [[sequelize.literal('id'), 'DESC']],
                where: {
                    title: {
                        [Op.like]: '%' + keyword + '%',
                    }
                },

            })
            res.forEach(d => {
                d.tag_ids = (d.tag_ids || '').split(',').filter(Boolean)
            })
            ctx.body = {
                msg: "OK",
                code: "0000",
                data: res,
                request: `${ctx.method} ${ctx.path}`
            };
            ctx.status = 200

        }

    },
    async search (ctx, next) {
        /**
         * published 1 发布，0 未发布
         */
        const { keyword } = JSON.parse(ctx.request.body);
        if (!keyword) {

            ctx.body = {
                msg: "搜索词不能为空！",
                code: "0000",
                data: null,
                request: `${ctx.method} ${ctx.path}`
            };
            ctx.status = 400
        } else {

            const res = await Article.findAll({
                //DESC 降序
                //ASC 升序
                order: [[sequelize.literal('id'), 'DESC']],
                where: {
                    title: { [Op.like]: '%' + keyword + '%', },
                    published: 1
                },
            })
            res.forEach(d => {
                d.tag_ids = (d.tag_ids || '').split(',').filter(Boolean)
            })
            ctx.body = {
                msg: "OK",
                code: "0000",
                data: res,
                request: `${ctx.method} ${ctx.path}`
            };
            ctx.status = 200

        }

    },
    async publishList (ctx, next) {
        /**
         * status 0 未发布 , 1发布, -1 删除
         */
        const { page, size, filter } = JSON.parse(ctx.request.body);
        if (!page && !size) {
            const rows = await Article.findAll({
                order: [[sequelize.literal('publish_time'), 'DESC']],
                where: {
                    [Op.and]: [
                        { published: '1' }
                    ].concat(
                        filter && filter.ca && filter.ca != 0 ? [{ category_id: filter.ca }] : []
                    )
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
                    rows: rows.map(d => {
                        return {
                            id: d.id,
                            covery_img: d.covery_img,
                            summary: d.summary,
                            title: d.title,
                            tag_ids: d.tag_ids,
                            category_id: d.category_id,
                            publish_time: d.publish_time,
                            read_nums: d.read_nums
                        }
                    })
                },
                request: `${ctx.method} ${ctx.path}`
            };
            ctx.status = 200
        } else {
            let reg = /\d/
            if (reg.test(page) || reg.test(size)) {
                let res;
                if (filter && filter.ca && filter.ca != 0) {
                    res = await Article.findAndCountAll({
                        order: [[sequelize.literal('publish_time'), 'DESC']],
                        where: {
                            [Op.and]: [
                                { published: '1' },
                                { category_id: filter.ca }
                            ],
                        },
                        offset: (page - 1) * size,
                        limit: size
                    })
                } else if (filter && filter.tag) {
                    let articleIds = await ArticleTag.findAll({
                        where: {
                            tag_id: filter.tag
                        }
                    });
                    let ids = articleIds.map(d => d.article_id)

                    res = await Article.findAndCountAll({
                        order: [[sequelize.literal('publish_time'), 'DESC']],
                        where: {
                            [Op.and]: [
                                { published: '1' },
                                {
                                    id: ids
                                }
                            ],
                        },
                        offset: (page - 1) * size,
                        limit: size
                    })
                } else {
                    res = await Article.findAndCountAll({
                        order: [[sequelize.literal('publish_time'), 'DESC']],
                        where: {
                            [Op.and]: [
                                { published: '1' },
                            ],
                        },
                        offset: (page - 1) * size,
                        limit: size
                    })
                }
                res.rows.forEach(d => {
                    d.tag_ids = (d.tag_ids || '').split(',').filter(Boolean)
                })
                ctx.body = {
                    msg: "OK",
                    code: "0000",
                    data: {
                        count: res.count,
                        rows: res.rows.map(d => {
                            return {
                                id: d.id,
                                covery_img: d.covery_img,
                                summary: d.summary,
                                title: d.title,
                                tag_ids: d.tag_ids,
                                category_id: d.category_id,
                                publish_time: d.publish_time,
                                read_nums: d.read_nums
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
            let res = await Article.create(s)

            if (article.published) {
                let bulkArr = article.tag_ids.map(d => {
                    return {
                        article_id: res.id,
                        tag_id: d
                    }
                })
                await ArticleTag.bulkCreate(bulkArr)
            }
            ctx.body = {
                msg: '创建成功',
                code: '0000',
                isOk: true
            }
            ctx.status = 200
        }
    },
    async publish (ctx, next) {
        /**
         * 
         */

        ctx.body = {
            msg: '标题不能为空',
            code: '0000',
        }
        ctx.status = 200

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
            await ArticleTag.destroy({
                where: {
                    article_id: article.id
                }
            });

            if (article.published == '1') {
                if (f.published == '0') {
                    article.publish_time = new Date;
                }
                //bulkCreate
                let bulkArr = article.tag_ids.map(d => {
                    return {
                        article_id: article.id,
                        tag_id: d
                    }
                })
                await ArticleTag.bulkCreate(bulkArr)
            }



            article.tag_ids = article.tag_ids.join(',');
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
            await ArticleTag.destroy({
                where: {
                    article_id: co.id
                }
            });
            await Article.destroy({
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
