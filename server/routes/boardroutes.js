const { Router } = require('express');
// const authController = require('../controllers/authController');
// const { requireAuth } = require('../middleware/authMiddleware');
const boardController = require('../controllers/boardController');

const router = Router();

router.get('/boards', boardController.boards_get);

router.get('/board/:board/:page', boardController.index_get);



module.exports = router;