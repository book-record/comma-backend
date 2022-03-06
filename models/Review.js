const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
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
    required: true,
  },
});

module.exports = mongoose.model('Review', ReviewSchema);
