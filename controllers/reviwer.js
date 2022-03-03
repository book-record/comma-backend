const Reviwer = require('../models/Reviwer');

exports.updateReview = async (req, res) => {
  const { reviwerId, creator, good } = req.body;

  const reviwer = await Reviwer.findById(reviwerId);

  if (!reviwer) {
    return res.json({ error: '존재하지 않습니다' });
  }

  if (good) {
    await Reviwer.findByIdAndUpdate(
      reviwerId,
      { $push: { likes: creator } },
      { new: true }
    );
  } else {
    await Reviwer.findByIdAndUpdate(
      reviwerId,
      { $pull: { likes: creator } },
      { new: true }
    );
  }

  res.json({ result: 'ok' });
};
