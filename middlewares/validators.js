const mongoose = require('mongoose');

const Book = require('../models/Book');

exports.validateBookId = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    throw new Error('유효하지 않은 id입니다');
  }

  const bookId = await Book.findById(id);
  if (!bookId) {
    throw new Error('해당 bookId를 찾을 수 없습니다');
  }
};
