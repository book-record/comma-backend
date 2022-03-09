const express = require('express');

const bookController = require('../controllers/book');
const audioFileUpload = require('../middlewares/audioFileUpload');
const {
  validateBookId,
  validateBook,
  validateCreateAudio,
} = require('../middlewares/validators');
const router = express.Router();

router.get('/list', bookController.getBookList);

router.post('/new', validateBook, bookController.createBook);

router.get('/:id', validateBookId, bookController.getBook);

router.post(
  '/:id/:userId',
  validateCreateAudio,
  audioFileUpload.single('audio'),
  bookController.createAudio
);

module.exports = router;
