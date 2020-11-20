const router = require('koa-router')();
const article = require('../controller/article');
const auth = require('@/middleware/auth')

router.get('/article/:id', article.detail);
router.post('/article/list', article.list);
router.post('/article/archives', article.archives);
router.post('/article/publishList', article.publishList);
router.post('/article/add', article.add);
router.post('/article/publish', article.publish);
router.post('/article/updata', article.updata);
router.post('/article/del', article.del);


module.exports = router;
