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

  console.log(id, bookTitle, imageUrl, title, text, startDate, finishDate);

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

  const date = new Date(finishDate);
  console.log(date);

  const mailSender = {
    sendGmail: function () {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS,
        },
      });

      transporter.sendMail({
        from: `"WDMA TEAM" <${process.env.NODEMAILER_USER}>`,
        to: user.email,
        subject: 'd-day 이메일 도착했습니다',
        text: 'd-day 이메일 도착',
        html: `
        <h1>이메일이 도착했습니다</h1>
        <b>${startDate.slice(0, 11)}에 보낸 이메일이 도착했습니다<b/>
        <a href="http://localhost:3000>페이지로 가기</a>
        `,
      });
    },
  };

  schedule.scheduleJob(date, () => {
    console.log('message');
    mailSender.sendGmail();
  });

  // let transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   host: 'smtp.gmail.com',
  //   secure: false,
  //   auth: {
  //     user: process.env.NODEMAILER_USER,
  //     pass: process.env.NODEMAILER_PASS,
  //   },
  // });

  // await transporter.sendMail({
  //   from: `"WDMA TEAM" <${process.env.NODEMAILER_USER}>`,
  //   to: user.email,
  //   subject: 'd-day 이메일 도착했습니다',
  //   text: 'd-day 이메일 도착',
  //   html: `
  //   <h1>이메일이 도착했습니다</h1>
  //   <b>${startDate.slice(0, 11)}에 보낸 이메일이 도착했습니다<b/>
  //   <a href="http://localhost:3000>페이지로 가기</a>
  //   `,
  // });

  res.json({
    result: 'ok',
  });
};

exports.getReport = async (req, res) => {
  const { id } = req.params;
  const report = await Report.findById(id);

  res.json(report);
};
