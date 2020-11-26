const router = require('koa-router')();
const sysinfo = require('../controller/sysinfo');
const auth = require('@/middleware/auth')
const admin = require('@/middleware/admin')

router.post('/sysinfo/info', sysinfo.info);
router.post('/sysinfo/updata', auth(), admin(), sysinfo.updata);


module.exports = router;
