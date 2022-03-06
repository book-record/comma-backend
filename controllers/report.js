// eslint-disable-next-line no-unused-vars
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
