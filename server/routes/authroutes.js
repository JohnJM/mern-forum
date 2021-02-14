const { Router } = require('express');
const authController = require('../controllers/authController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');

const router = Router();

router.post('/signup', authController.signup_post);

router.post('/login', authController.login_post);

router.get('/vip', requireAuth, authController.vippage_get);

router.post('/changePwd', requireAuth, authController.changePwd_post);

router.get('/user/:uid', authController.publicUserInfo_get);

module.exports = router;

 