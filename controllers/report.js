// eslint-disable-next-line no-unused-vars
const Book = require('../models/Book');
const Report = require('../models/Report');
const User = require('../models/User');

exports.getReportList = async (req, res) => {
  const { id } = req.params;
  const PAGE_SIZE = 8;

  const page = parseInt(req.query.page || '0');

  const allReport = await User.findById(id)
    .populate('reportHistory')
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * page);

  const reportList = allReport.reportHistory;
  const total = allReport.reportHistory.length;

  return res.json({
    totalPage: Math.ceil(total / PAGE_SIZE),
    reportList,
  });
};

exports.createReport = async (req, res) => {
  const { id, bookTitle, imageUrl, title, text, date } = req.body;

  const result = await Report.create({
    bookTitle,
    imageUrl,
    title,
    text,
    dDay: date,
  });

  await User.findByIdAndUpdate(id, {
    $push: { reportHistory: result._id },
  });

  res.json({
    result: 'ok',
  });
};

exports.getReport = async (req, res) => {
  const { id } = req.params;
  const report = await Report.findById(id);

  res.json(report);
};
