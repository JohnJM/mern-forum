const { Router } = require('express');
const { check } = require('express-validator');

// const authController = require('../controllers/authController');
// const { requireAuth } = require('../middleware/authMiddleware');
const threadController = require('../controllers/threadController');
const fileUpload = require('../middleware/file-upload');

const router = Router();


router.post('/thread/create',
fileUpload.single('image'),
[
    check('subject').isLength({min: 3})
],
threadController.createThread_post);


router.get('/thread/:thread_id', threadController.get_OPAndPosts);

module.exports = router;


