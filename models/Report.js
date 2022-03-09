const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
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
  startDate: {
    type: String,
    required: true,
  },
  finishDate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Report', ReportSchema);
