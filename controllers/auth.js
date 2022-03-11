const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signIn = async (req, res) => {
  const { email, nickname } = req.body;
  let user = await User.findOne({ email });

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

exports.checkUser = async (req, res) => {
  const accessToken = req.headers.authorization.split(' ')[1];
  if (!accessToken) {
    return res.json({ result: 'error' });
  }
  const userEmail = jwt.verify(accessToken, process.env.JWT_SECRET).email;
  const user = await User.findOne({ email: userEmail });

  res.json({
    userId: user._id,
    email: user.email,
    nickname: user.nickname,
  });
};
