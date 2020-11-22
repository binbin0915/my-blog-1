const router = require('koa-router')();
const book = require('../controller/book');
const auth = require('@/middleware/auth')
const admin = require('@/middleware/admin')

router.post('/book/list', book.list);
router.post('/book/add', auth(), admin(), book.add);
router.post('/book/updata', auth(), admin(), book.updata);
router.post('/book/del', auth(), admin(), book.del);


module.exports = router;
