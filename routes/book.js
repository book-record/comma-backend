const express = require('express');

const bookController = require('../controllers/book');
const audioFileUpload = require('../middlewares/audioFileUpload');

const router = express.Router();

router.get('/list', bookController.getBookList);

router.post('/new', bookController.createBook);

router.get('/:id', bookController.getBook);

router.post(
  '/:id/:userId',
  audioFileUpload.single('audio'),
  bookController.createAudio
);

module.exports = router;
