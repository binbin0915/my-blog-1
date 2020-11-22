const router = require('koa-router')();
const tags = require('../controller/tags');
const auth = require('@/middleware/auth')
const admin = require('@/middleware/admin')

router.post('/tags/list', tags.list);
router.post('/tags/tagArticle', tags.tag_article);
router.post('/tags/add', auth(), admin(), tags.add);
router.post('/tags/del', auth(), admin(), tags.del);
router.post('/tags/updata', auth(), admin(), tags.updata);




module.exports = router;
