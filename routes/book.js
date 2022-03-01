const express = require('express');

const bookController = require('../controllers/book');

const router = express.Router();

router.get('/list', bookController.getBookList);

router.post('/new', bookController.createBook);
module.exports = router;
