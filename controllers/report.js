const User = require('../models/User');

exports.getReportList = async (req, res) => {
  const { id } = req.params;
  console.log(id, req.query.page);
  const PAGE_SIZE = 8;

  const page = parseInt(req.query.page || '0');
  const total = await User.findById(id)
    .populate('reportHistroy')
    .countDocuments({});

  const reportList = await User.findById(id)
    .populate('reportHistroy')
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * page);

  return res.json({
    totalPage: Math.ceil(total / PAGE_SIZE),
    reportList,
  });
};
