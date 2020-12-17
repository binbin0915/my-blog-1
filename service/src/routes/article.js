const router = require('koa-router')();
const article = require('../controller/article');

router.post('/article/detail', article.detail);
router.post('/article/read', article.read);
router.post('/article/list', article.list);
router.post('/article/recentArticle', article.recentArticle);
router.post('/article/search', article.search);

router.post('/article/searchAll', article.searchAll);
router.post('/article/archives', article.archives);
router.post('/article/publishList', article.publishList);

router.post('/article/add', article.add);
router.post('/article/updata', article.updata);
router.post('/article/del', article.del);

module.exports = router;
