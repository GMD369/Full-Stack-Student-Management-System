const express = require('express');
const { register, login, logout, me } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');
const { registerRules, loginRules, handleValidation } = require('../utils/validators');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post('/register', registerRules, handleValidation, asyncHandler(register));
router.post('/login', loginRules, handleValidation, asyncHandler(login));
router.post('/logout', asyncHandler(logout));
router.get('/me', verifyToken, asyncHandler(me));

module.exports = router;
