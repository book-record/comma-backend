const express = require('express');

const authController = require('../controllers/auth');
const router = express.Router();

router.post('/login', authController.signIn);

router.get('/', authController.checkUser);

module.exports = router;
