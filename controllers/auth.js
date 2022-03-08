const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signIn = async (req, res, next) => {
  const { email, nickname } = req.body;
  let user = await User.findOne({ email }).lean();

  if (!user) {
    user = await User.create({ email, nickname, reportHistory: [] });
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

  res.json({
    userId: user._id,
    email: user.email,
    nickname: user.nickname,
    token: accessToken,
  });
};

exports.checkUser = async (req, res, next) => {
  const token = req.headers.authorization.split(' ');
  try {
    if (token) {
      const user = await User.findOne(token.email);
      return res.json({
        userId: user._id,
        email: user.email,
        nickname: user.nickname,
      });
    }
  } catch (error) {
    return error;
  }
};
