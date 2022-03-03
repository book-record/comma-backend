const express = require('express');

const bookController = require('../controllers/book');
const { uploadAudio } = require('../middlewares/audioFileUpload');
const { validateBookId } = require('../middlewares/validators');

const router = express.Router();

router.get('/list', bookController.getBookList);

router.post('/new', bookController.createBook);

router.get('/:id', bookController.getBook);

router.post(
  ':id',
  validateBookId,
  uploadAudio.single('audiofile'),
  bookController.createAudio
);

module.exports = router;
