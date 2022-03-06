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
  reportHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Report',
    },
  ],
});

module.exports = mongoose.model('User', userShcema);
