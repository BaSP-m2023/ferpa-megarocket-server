const Subscription = require('../models/Subscription');

const getAllSub = (req, res) => {
  Subscription.find()
    .then((subscriptions) => res.status(200).json({
      message: 'Complete subscriptions list',
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
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Subscription with id: ${id} was not found`,
          error: true,
        });
      }
      return res.status(200).json({
        message: `Subscription with id: ${id} was found`,
        data: result,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({
      message: 'An error ocurred',
      error,
    }));
};

const createSub = (req, res) => {
  const { classId, memberId, date } = req.body;

  Subscription.create({
    classId,
    memberId,
    date,
  })
    .then((result) => res.status(201).json({
      message: 'Subscription created succesfully',
      data: result,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      message: 'An error ocurred',
      error,
    }));
};

const updateSub = (req, res) => {
  const { id } = req.params;
  const { classId, memberId, date } = req.body;

  Subscription.findByIdAndUpdate(
    id,
    {
      classId,
      memberId,
      date,
    },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Subscription with id: ${id} was not found`,
          error: true,
        });
      }
      return res.status(200).json({
        message: `Subscription with id: ${id} was succesfully updated`,
        data: result,
        error: false,
      });
    })
    .catch((error) => res.status(400).json(error));
};

const deleteSub = (req, res) => {
  const { id } = req.params;

  Subscription.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Subscription with id: ${id} was not found`,
        });
      }
      return res.status(200).json({
        message: `Subscription with id: ${id} was succesfully deleted`,
      });
    })
    .catch((error) => res.status(400).json({
      message: 'An error ocurred!',
      error,
    }));
};

module.exports = {
  getAllSub,
  getSubById,
  createSub,
  updateSub,
  deleteSub,
};
