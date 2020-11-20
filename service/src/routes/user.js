const router = require('koa-router')();
const user = require('../controller/user');
const auth = require('@/middleware/auth')
router.post('/user/regist', user.regist);
router.post('/user/login', user.login);
router.get('/user/getuserinfo', auth(), user.getuserinfo);
router.post('/user/updatainfo', auth(), user.updatainfo);




module.exports = router;
