const express = require('express');

const reviewController = require('../controllers/review');
const { validateReview } = require('../middlewares/validators');
const router = express.Router();

router.put('/', validateReview, reviewController.updateReview);

module.exports = router;
