const router = require('koa-router')();
const message = require('../controller/message');


router.post('/message/list', message.list);
router.post('/message/add', message.add);
router.post('/message/updata', message.updata);
router.post('/message/del', message.del);

module.exports = router;
