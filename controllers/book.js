const Book = require('../models/Book');

exports.getBookList = async (req, res, next) => {
  const PAGE_SIZE = 6;
  const page = parseInt(req.query.page || '0');
  const total = await Book.countDocuments({});
  const bookList = await Book.find({})
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * page);

  return res.json({
    totalPage: Math.ceil(total / PAGE_SIZE),
    bookList,
  });
};
