const { Router } = require('express');
// const authController = require('../controllers/authController');
// const { requireAuth } = require('../middleware/authMiddleware');
const boardController = require('../controllers/boardController');

const router = Router();

router.get('/boards', boardController.boards_get);

module.exports = router;