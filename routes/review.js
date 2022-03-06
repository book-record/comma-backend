const express = require('express');

const reviewController = require('../controllers/review');
const router = express.Router();

router.put('/', reviewController.updateReview);

module.exports = router;
