const Reviewer = require('../models/Reviewer');

exports.updateReview = async (req, res) => {
  const { reviewerId, userId, good } = req.body;
  const reviwer = await Reviewer.findById(reviewerId);
  console.log(reviewerId, userId, good);
  if (!reviwer) {
    return res.json({ error: '존재하지 않습니다' });
  }

  if (good) {
    await Reviewer.findByIdAndUpdate(
      reviewerId,
      { $push: { likes: userId } },
      { new: true }
    );
  } else {
    await Reviewer.findByIdAndUpdate(
      reviewerId,
      { $pull: { likes: userId } },
      { new: true }
    );
  }

  res.json({ result: 'ok' });
};
