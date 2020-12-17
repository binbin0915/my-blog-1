const router = require('koa-router')();
const tags = require('../controller/tags');

router.post('/tags/list', tags.list);
router.post('/tags/tagArticle', tags.tag_article);
router.post('/tags/add', tags.add);
router.post('/tags/del', tags.del);
router.post('/tags/updata', tags.updata);




module.exports = router;
