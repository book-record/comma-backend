const mongoose = require('mongoose');

const Book = require('../models/Book');
const Report = require('../models/Report');
const Review = require('../models/Review');
const User = require('../models/User');

function checkTypeOfString(string) {
  if (!(typeof string === 'string')) {
    throw new Error('글자가 아닙니다');
  }
}

function checkTypeOfBoolean(boolean) {
  if (!(typeof boolean === 'boolean')) {
    throw new Error('boolean이 아닙니다');
  }
}

async function checkUserId(id) {
  const user = await User.findById({ _id: id });

  if (!mongoose.isValidObjectId(id)) {
    throw new Error('유효하지 않은 user id입니다');
  }

  if (!user) {
    throw new Error('해당 userId를 찾을 수 없습니다');
  }
}

async function checkBookId(id) {
  const book = await Book.findById(id);

  if (!mongoose.isValidObjectId(id)) {
    throw new Error('유효하지 않은 book id입니다');
  }

  if (!book) {
    throw new Error('해당 bookId를 찾을 수 없습니다');
  }
}

async function checkReportId(id) {
  const report = await Report.findById(id);

  if (!mongoose.isValidObjectId(id)) {
    throw new Error('유요하하지 않은 report id입니다');
  }

  if (!report) {
    throw new Error('해당 reportId를 찾을 수 없습니다');
  }
}

async function checkReviewId(id) {
  const review = await Review.findById(id);
  if (!mongoose.isValidObjectId(id)) {
    throw new Error('유요하하지 않은 report id입니다');
  }

  if (!review) {
    throw new Error('해당 reportId를 찾을 수 없습니다');
  }
}

module.exports = {
  checkTypeOfString,
  checkUserId,
  checkBookId,
  checkReportId,
  checkTypeOfBoolean,
  checkReviewId,
};
