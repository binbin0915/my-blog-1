require('module-alias/register')
const Koa = require('koa');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const InitManager = require('@/core/init')
const PORT = process.env.PORT || 4000;
const app = new Koa();

// static
app.use(require('koa-static')(__dirname + '/public'));

// bodyParser
app.use(
    bodyParser({
        enableTypes: ['json', 'form', 'text'],
    })
);
// ejs
app.use(
    views(__dirname + '/src/views', {
        extension: 'ejs',
    })
);
// init
InitManager.initCore(app)

app.listen(PORT, () => {
    //console.log(`Koa is runing in localhost:${PORT}`);
});
