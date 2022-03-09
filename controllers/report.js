const schedule = require('node-schedule');
const nodemailer = require('nodemailer');

// eslint-disable-next-line no-unused-vars
const Book = require('../models/Book');
const Report = require('../models/Report');
const User = require('../models/User');

exports.getReportList = async (req, res) => {
  const { id } = req.params;
  const PAGE_SIZE = 8;
  const page = parseInt(req.query.page || '0');
  const allReport = await User.findById(id).populate('reportHistory');

  const reportHistory = allReport.reportHistory;
  const reportList = reportHistory.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE
  );
  const total = allReport.reportHistory.length;

  return res.json({
    totalPage: Math.ceil(total / PAGE_SIZE),
    reportList,
  });
};

exports.createReport = async (req, res) => {
  const { id, bookTitle, imageUrl, title, text, startDate, finishDate } =
    req.body;

  const result = await Report.create({
    bookTitle,
    imageUrl,
    title,
    text,
    startDate,
    finishDate,
  });

  const user = await User.findByIdAndUpdate(id, {
    $push: { reportHistory: result._id },
  });

  const dDay = new Date(finishDate);

  const mailOptions = {
    from: `"Comma" <${process.env.NODEMAILER_USER}>`,
    to: user.email,
    subject: '타임캡슐이 도착했습니다',
    text: 'd-day 이메일 도착',
    html: `
      <h2>${startDate.slice(0, 10)}일에 보낸 당신의 이야기가 도착했습니다<h2/>
      <br>
      <br>
      <a href="http://localhost:3000/report/${result._id}">페이지로 가기</a>
    `,
  };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  schedule.scheduleJob(dDay, () => {
    transporter.sendMail(mailOptions);
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
