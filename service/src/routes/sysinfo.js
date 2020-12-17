const router = require('koa-router')();
const sysinfo = require('../controller/sysinfo');

router.post('/sysinfo/info', sysinfo.info);
router.post('/sysinfo/updata', sysinfo.updata);


module.exports = router;
