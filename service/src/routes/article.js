const router = require('koa-router')();
const article = require('../controller/article');
const auth = require('@/middleware/auth')
const admin = require('@/middleware/admin')

router.post('/article/detail', article.detail);
router.post('/article/read', article.read);
router.post('/article/list', article.list);
router.post('/article/search', article.search);
router.post('/article/archives', article.archives);
router.post('/article/publishList', article.publishList);

router.post('/article/add', auth(), admin(), article.add);
router.post('/article/updata', auth(), admin(), article.updata);
router.post('/article/del', auth(), admin(), article.del);


module.exports = router;
