const Subscription = require('../models/Subscription');

const getAllSub = (req, res) => {
  Subscription.find()
    .then((subscriptions) => res.status(200).json({
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
  const { classId, member, date } = req.body;

  Subscription.create({
    classId,
    member,
    date,
  })
    .then((result) => res.status(201).json(result))
    .catch((error) => res.status(400).json({
      message: 'An error ocurred',
      error,
    }));
};

const updateSub = (req, res) => {
  const { id } = req.params;
  const { classId, member, date } = req.body;

  Subscription.findByIdAndUpdate(
    id,
    {
      classId,
      member,
      date,
    },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Pokemon with id: ${id} was not found`,
          error: true,
        });
      }
      return res.status(200).json(result);
    })
    .catch((error) => res.status(400).json(error));
};

module.exports = {
  getAllSub,
  getSubById,
  createSub,
  updateSub,
};
