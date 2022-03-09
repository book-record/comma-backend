const {
  checkTypeOfString,
  checkUserId,
  checkReportId,
  checkBookId,
  checkTypeOfBoolean,
  checkReviewId,
} = require('../utils/validator');

exports.validateCreateAudio = async (req, res, next) => {
  const { id, userId } = req.params;

  checkUserId(userId);
  checkBookId(id);

  return next();
};

exports.validateBookId = async (req, res, next) => {
  const { id } = req.params;

  checkBookId(id);

  return next();
};

exports.validateBook = async (req, res, next) => {
  const { title, authors, thumbnail, contents } = req.body;

  checkTypeOfString(title);
  checkTypeOfString(authors[0]);
  checkTypeOfString(thumbnail);
  checkTypeOfString(contents);

  return next();
};

exports.validateUserId = async (req, res, next) => {
  const { id } = req.params;

  checkUserId(id);

  return next();
};

exports.validateReportId = async (req, res, next) => {
  const { id } = req.params;

  checkReportId(id);

  return next();
};

exports.validateReport = async (req, res, next) => {
  const { id, bookTitle, imageUrl, title, text, startDate, finishDate } =
    req.body;

  checkUserId(id);
  checkTypeOfString(bookTitle);
  checkTypeOfString(imageUrl);
  checkTypeOfString(title);
  checkTypeOfString(text);
  checkTypeOfString(startDate);
  checkTypeOfString(finishDate);

  return next();
};

exports.validateReview = async (req, res, next) => {
  const { reviewerId, userId, good } = req.body;

  checkReviewId(reviewerId);
  checkUserId(userId);
  checkTypeOfBoolean(good);

  return next();
};
