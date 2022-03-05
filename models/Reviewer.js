const mongoose = require('mongoose');

const ReviewerSchema = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
    required: true,
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
    required: true,
  },
});

module.exports = mongoose.model('Reviewer', ReviewerSchema);
