const router = require('koa-router')();
const assert = require('assert');

router.get('/', async (ctx, next) => {
    //const views = require('koa-views');之后有了render方法
    await ctx.render('index', {
        title: 'Hello Koa 2!',
        baseUrl: process.env.KOA_APP_BASE_URL || '--',
        runEnv: process.env.KOA_APP_RUN_ENV || '--',
    });
});

router.get('/test', async (ctx, next) => {
    assert(next, 'asdfljaldsf');
    ctx.body = 'this is test !';
});

router.get('/blogs/test', async (ctx, next) => {
    assert(next, 'asdfljaldsf');
    ctx.body = 'blogs test !';
});

module.exports = router;
