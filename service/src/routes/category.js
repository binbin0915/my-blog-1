const router = require('koa-router')();
const category = require('../controller/category');
const auth = require('@/middleware/auth')
const admin = require('@/middleware/admin')

router.post('/category/list', category.list);
router.post('/category/add', auth(), admin(), category.add);
router.post('/category/del', auth(), admin(), category.del);
router.post('/category/updata', auth(), admin(), category.updata);




module.exports = router;
