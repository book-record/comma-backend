const Book = require('../models/Book');
const Review = require('../models/Review');
const User = require('../models/User');

exports.getBookList = async (req, res) => {
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

exports.createBook = async (req, res) => {
  let { title, authors, thumbnail, contents } = req.body;
  const allBooks = await Book.find({});

  for (const key of allBooks) {
    if (title === key.bookTitle) {
      return res.json({ error: '같은 책이 존재합니다' });
    }
  }

  await Book.create({
    bookTitle: title,
    author: authors[0],
    imageUrl: thumbnail,
    introduction: contents,
    reviewHistory: [],
  });

  res.json({ result: 'ok' });
};

exports.createAudio = async (req, res) => {
  const { id, userId } = req.params;
  const awsAudioFile = req.file.location;
  const user = await User.findById({ _id: userId });

  const result = await Review.create({
    id: user._id,
    nickname: user.nickname,
    sound: awsAudioFile,
    likes: [],
  });

  await Book.findByIdAndUpdate(id, {
    $push: { reviewHistory: result._id },
  });

  res.json({
    result: 'ok',
  });
};

exports.getBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id).populate('reviewHistory');
  if (!book) {
    return res.json({ error: '책이 존재 하지 않습니다' });
  }

  res.json(book);
};
