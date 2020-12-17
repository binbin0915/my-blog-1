const router = require('koa-router')();
const book = require('../controller/book');

router.post('/book/list', book.list);
router.post('/book/add', book.add);
router.post('/book/updata', book.updata);
router.post('/book/del', book.del);


module.exports = router;
