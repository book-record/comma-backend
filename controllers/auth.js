const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.login = async (req, res, next) => {
  const { email, nickname } = req.body;
  let user = await User.findOne({ email }).lean();

  if (!user) {
    user = await User.create({ email, nickname, recordHistory: [] });
  }

  const accessToken = jwt.sign(
    {
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN_TIME,
      issuer: 'yohan',
      subject: 'record',
    }
  );

  res.send({
    userId: user._id,
    email: user.email,
    nickname: user.nickname,
    token: accessToken,
  });
};
