const express = require('express');

const reviwerController = require('../controllers/auth');

const router = express.Router();

router.put('/', reviwerController.updateReview);

module.exports = router;
