const {
  checkTypeOfString,
  checkUserId,
  checkReportId,
  checkBookId,
  checkTypeOfBoolean,
  checkReviewId,
  checkmongooseId,
} = require('../utils/validator');

exports.validateCreateAudio = async (req, res, next) => {
  const { id, userId } = req.params;

  if (await checkmongooseId(id)) return next('유효하지 않은 id 입니다');
  if (await checkBookId(id)) return next('유효하지 않은 bookId 입니다');
  if (await checkmongooseId(userId)) return next('유효하지 않은 id 입니다');
  if (await checkUserId(userId)) return next('유효하지 않은 userId 입니다');

  return next();
};

exports.validateBookId = async (req, res, next) => {
  const { id } = req.params;

  if (await checkmongooseId(id)) return next('유효하지 않은 id 입니다');
  if (await checkBookId(id)) return next('유효하지 않은 bookId 입니다');

  return next();
};

exports.validateBook = async (req, res, next) => {
  const { title, authors, thumbnail, contents } = req.body;

  if (checkTypeOfString(title)) return next('type은 string이 아닙니다');
  if (checkTypeOfString(authors[0])) return next('type은 string이 아닙니다');
  if (checkTypeOfString(thumbnail)) return next('type은 string이 아닙니다');
  if (checkTypeOfString(contents)) return next('type은 string이 아닙니다');

  return next();
};

exports.validateUserId = async (req, res, next) => {
  const { id } = req.params;

  if (await checkmongooseId(id)) return next('유효하지 않은 id 입니다');
  if (await checkUserId(id)) return next('유효하지 않은 userId 입니다');

  return next();
};

exports.validateReportId = async (req, res, next) => {
  const { id } = req.params;

  if (await checkmongooseId(id)) return next('유효하지 않은 id 입니다');
  if (await checkReportId(id)) return next('유효하지 않은 reportId 입니다');

  return next();
};

exports.validateReport = async (req, res, next) => {
  const { id, bookTitle, imageUrl, title, text, startDate, finishDate } =
    req.body;

  if (await checkmongooseId(id)) return next('유효하지 않은 id 입니다');
  if (await checkUserId(id)) return next('유효하지 않은 userId 입니다');

  if (checkTypeOfString(bookTitle)) return next('type은 string이 아닙니다');
  if (checkTypeOfString(imageUrl)) return next('type은 string이 아닙니다');
  if (checkTypeOfString(title)) return next('type은 string이 아닙니다');
  if (checkTypeOfString(text)) return next('type은 string이 아닙니다');
  if (checkTypeOfString(startDate)) return next('type은 string이 아닙니다');
  if (checkTypeOfString(finishDate)) return next('type은 string이 아닙니다');

  return next();
};

exports.validateReview = async (req, res, next) => {
  const { reviewerId, userId, good } = req.body;

  if (await checkmongooseId(reviewerId)) return next('유효하지 않은 id 입니다');
  if (await checkReviewId(reviewerId))
    return next('유효하지 않은 reviewerId 입니다');
  if (await checkmongooseId(userId)) return next('유효하지 않은 id 입니다');
  if (await checkUserId(userId)) return next('유효하지 않은 userId 입니다');
  if (checkTypeOfBoolean(good)) return next('type이 boolean이 아닙니다');

  return next();
};
