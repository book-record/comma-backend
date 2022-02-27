const mongoose = require('mongoose');

const userShcema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  recordHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Record',
    },
  ],
});

module.exports = mongoose.model('User', userShcema);
