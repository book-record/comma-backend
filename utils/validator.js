const mongoose = require('mongoose');

const Book = require('../models/Book');
const Report = require('../models/Report');
const Review = require('../models/Review');
const User = require('../models/User');

function checkTypeOfString(string) {
  if (!(typeof string === 'string')) {
    return true;
  }
}

function checkTypeOfBoolean(boolean) {
  if (!(typeof boolean === 'boolean')) {
    return true;
  }
}

async function checkmongooseId(id) {
  if (!mongoose.isValidObjectId(id)) {
    return true;
  }
}

async function checkUserId(id) {
  const user = await User.findById({ _id: id });

  if (!user) {
    return true;
  }
}

async function checkBookId(id) {
  const book = await Book.findById(id);

  if (!book) {
    return true;
  }
}

async function checkReportId(id) {
  const report = await Report.findById(id);

  if (!report) {
    return true;
  }
}

async function checkReviewId(id) {
  const review = await Review.findById(id);

  if (!review) {
    return true;
  }
}

module.exports = {
  checkTypeOfString,
  checkUserId,
  checkBookId,
  checkReportId,
  checkTypeOfBoolean,
  checkReviewId,
  checkmongooseId,
};
