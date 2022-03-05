const express = require('express');

const reviwerController = require('../controllers/review');

const router = express.Router();

router.put('/', reviwerController.updateReview);

module.exports = router;
