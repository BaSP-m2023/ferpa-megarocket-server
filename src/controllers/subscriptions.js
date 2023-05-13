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

const getSubById = (req, res) => {
  const { id } = req.params;

  Subscription.findById(id)
    .then((subscriptions) => res.status(200).json({
      message: 'Subscription found!',
      data: subscriptions,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: 'An error ocurred',
      error,
    }));
};

const createSub = (req, res) => {
  const { _class, member, date } = req.body;

  Subscription.create({
    _class,
    member,
    date,
  })
    .then((result) => res.status(201).json(result))
    .catch((error) => res.status(400).json({
      message: 'An error ocurred',
      error,
    }));
};

module.exports = {
  getAllSub,
  getSubById,
  createSub,
};
