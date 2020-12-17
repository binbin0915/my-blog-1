const router = require('koa-router')();
const category = require('../controller/category');

router.post('/category/list', category.list);
router.post('/category/add', category.add);
router.post('/category/del', category.del);
router.post('/category/updata', category.updata);



module.exports = router;
