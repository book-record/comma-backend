const Review = require('../models/Review');

exports.updateReview = async (req, res) => {
  const { reviewerId, userId, good } = req.body;
  const reviwer = await Review.findById(reviewerId);

  if (!reviwer) {
    return res.json({ error: '존재하지 않습니다' });
  }

  if (good) {
    await Review.findByIdAndUpdate(
      reviewerId,
      { $push: { likes: userId } },
      { new: true }
    );
  } else {
    await Review.findByIdAndUpdate(
      reviewerId,
      { $pull: { likes: userId } },
      { new: true }
    );
  }

  res.json({ result: 'ok' });
};
