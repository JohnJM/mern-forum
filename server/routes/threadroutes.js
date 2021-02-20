const { Router } = require('express');
// const authController = require('../controllers/authController');
// const { requireAuth } = require('../middleware/authMiddleware');
const threadController = require('../controllers/threadController');
import fileUpload from '../middleware/file-upload';

const router = Router();

router.post('/thread/create',
fileUpload.single('image'),
[
    check('subject').isLength({min: 3})
],
threadController.createThread_post);

module.exports = router;