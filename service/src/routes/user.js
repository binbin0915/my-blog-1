const router = require('koa-router')();
const user = require('../controller/user');

router.post('/user/regist', user.regist);
router.post('/user/login', user.login);
router.get('/user/getuserinfo', user.getuserinfo);
router.post('/user/updatainfo', user.updatainfo);



module.exports = router;
