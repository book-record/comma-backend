const Book = require('../models/Book');

exports.getBookList = async (req, res, next) => {
  const PAGE_SIZE = 8;
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
  let { title, authors, thumbnail, contents } = req.body;
  const allBooks = await Book.find({});

  for (const key of allBooks) {
    if (title === key.bookTitle) {
      return next('이미 있는 책입니다');
    }
  }

  await Book.create({
    bookTitle: title,
    author: authors[0],
    imageUrl: thumbnail,
    introduction: contents,
    players: [],
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

exports.getBook = async (req, res, next) => {
  const { id } = req.params;
  const book = await Book.findById(id);

  if (!book) {
    return next('책 정보가 없습니다');
  }

  res.json({ book });
};
