const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  bookTitle: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  dDay: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Report', ReportSchema);
