const cacheManager = require('cache-manager');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {
    User
} = require('@/models/user')
const memoryCache = cacheManager.caching({
    store: 'memory',
    max: 100,
    ttl: 60 /* seconds */,
});

module.exports = {
    async regist (ctx, next) {
        const p = JSON.parse(ctx.request.body);
        let reg = /^[0-9a-zA-Z]{4,16}$/;

        if (p && p.username && p.password && p.repassword) {
            let msg = '注册成功', data = null;
            let f = !reg.test(p.username), f2 = !reg.test(p.password);
            if (p.password !== p.repassword) {
                msg = '两次密码不一致！'
            } else if (f || f2) {
                msg = '用户名或者密码不符合要求！'
            } else {
                const userFind = await User.findOne({
                    where: {
                        username: p.username
                    }
                })

                if (userFind) {
                    msg = '用户名已存在'


                } else {
                    await User.create({
                        username: p.username,
                        password: p.password
                    })

                    msg = '用户创建成功',
                        data = {
                            isOk: true
                        }
                }

            }
            ctx.body = {
                msg,
                code: "0000",
                data,
                request: `${ctx.method} ${ctx.path}`
            };
            ctx.status = 200
        } else {
            ctx.body = {
                msg: '参数不正确',
                code: "400",
                data: null,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 400
        }
    },
    async login (ctx, next) {
        const p = JSON.parse(ctx.request.body);
        let reg = /^[0-9a-zA-Z]{4,16}$/;

        if (p && p.username && p.password) {
            let msg = '注册成功', data = null;
            let f = !reg.test(p.username), f2 = !reg.test(p.password);
            if (f || f2) {
                msg = '用户名或者密码不符合要求！'
            } else {
                const userFind = await User.findOne({
                    where: {
                        username: p.username
                    }
                })

                if (!userFind) {
                    msg = '用户不存在'
                } else {
                    let res = bcrypt.compareSync(p.password, userFind.password);
                    if (res) {
                        let content = { name: p.username };
                        let token = jwt.sign(content, 'secretOrPrivateKey', {
                            expiresIn: 60 * 60 * 1  // 1小时过期
                        });
                        userFind.token = token
                        userFind.save()
                        msg = '登录成功'
                        data = {
                            token: token
                        }
                    } else {
                        msg = '密码不正确'
                    }
                }

            }
            ctx.body = {
                msg,
                code: "0000",
                data,
                request: `${ctx.method} ${ctx.path}`
            };
            ctx.status = 200
        } else {
            ctx.body = {
                msg: '参数不正确',
                code: "400",
                data: null,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 400
        }


    },
    async getuserinfo (ctx, next) {
        const f = ctx.f
        ctx.body = {
            msg: 'OK',
            code: "0000",
            data: {
                username: f.username,
                nickname: f.nickname,
                role: f.role,
                status: f.status,
                email: f.email,
                token: f.token
            },
            request: `${ctx.method} ${ctx.path}`
        }
    },

    async updatainfo (ctx, next) {
        const f = ctx.f
        const { nickname, email } = JSON.parse(ctx.request.body);
        f.nickname = nickname;
        f.email = email
        f.save()
        ctx.body = {
            msg: 'OK',
            code: "0000",
            data: {
                username: f.username,
                nickname: f.nickname,
                role: f.role,
                status: f.status,
                email: f.email,

            },
            request: `${ctx.method} ${ctx.path}`
        }


    },


};
