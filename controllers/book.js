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

exports.createBook = async (req, res, next) => {
  const { bookTitle, author, imageUrl, introduction } = req.body;

  const allBooks = await Book.find({});
  for (const key of allBooks) {
    if (bookTitle === key.bookTitle) {
      return next('이미 있는 책입니다');
    }
  }

  await Book.create({
    bookTitle,
    author,
    imageUrl,
    introduction,
    players: {},
  });

  res.json({ result: 'ok' });
};

exports.createAudio = async (req, res, next) => {
  const { id } = req.params;
  const { creator, nickname } = req.body;

  const awsAudioFile = req.file.location;

  await Book.findByIdAndUpdate(id, {
    $push: { players: creator, nickname, sound: awsAudioFile, likes: [] },
  });

  res.json({
    result: 'ok',
  });
};
