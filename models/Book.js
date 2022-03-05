const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  bookTitle: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  introduction: {
    type: String,
    required: true,
  },
  reviewerHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reviewer',
    },
  ],
});

module.exports = mongoose.model('Book', BookSchema);
