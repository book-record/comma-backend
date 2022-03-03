const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  nickname: {
    type: String,
    required: true,
  },
  sound: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
  },
});

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
  players: [playerSchema],
});

module.exports = mongoose.model('Book', BookSchema);
