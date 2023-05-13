const Subscription = require('../models/Subscription');

const getAllSub = (req, res) => {
  Subscription.find()
    .then((subscriptions) => res.status.json({
      message: 'Complete subscription list',
      data: subscriptions,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: 'An error ocurred',
      error,
    }));
};

module.exports = {
  getAllSub,
};
