const express = require('express');
const { signup, login, changePassword } = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/change-password', authenticateToken, changePassword);

module.exports = router;
