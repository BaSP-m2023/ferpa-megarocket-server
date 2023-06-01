const Subscription = require('../models/Subscription');

const regexObjectId = /^[0-9a-fA-F]{24}$/;

const getAllSub = (req, res) => {
  Subscription.find().populate({
    path: 'classId',
    populate: { path: 'activityId' },
  }).populate('memberId')
    .then((subscriptions) => res.status(200).json({
      message: 'Complete subscriptions list',
      data: subscriptions,
      error: false,
    }))
    .catch(() => res.status(500).json({
      message: 'An error ocurred',
      data: undefined,
      error: true,
    }));
};

const getAllSubThisWeek = async (req, res) => {
  const currentDate = new Date();
  const currentWeekStart = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - currentDate.getDay(),
  );
  const currentWeekEnd = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - currentDate.getDay() + 6,
  );
  Subscription.where('date').gte(currentWeekStart).lte(currentWeekEnd).populate('classId memberId')
    .then((subscriptions) => res.status(200).json({
      message: 'This week subscriptions',
      data: subscriptions,
      error: false,
    }))
    .catch(() => res.status(500).json({
      message: 'An error ocurred',
      data: undefined,
      error: true,
    }));
};

const getSubById = (req, res) => {
  const { id } = req.params;
  if (!id.match(regexObjectId)) {
    res.status(404).json({
      message: 'Please put a valid ID!',
      data: undefined,
      error: true,
    });
  }
  Subscription.findById(id).populate('classId memberId')
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: `Subscription with id: ${id} was not found`,
          data: undefined,
          error: true,
        });
      }
      res.status(200).json({
        message: `Subscription with id: ${id} was found`,
        data: result,
        error: false,
      });
    })
    .catch(() => res.status(500).json({
      message: 'An error ocurred',
      data: undefined,
      error: true,
    }));
};

const createSub = (req, res) => {
  const { classId, memberId, date } = req.body;

  Subscription.findOne({
    classId,
    memberId,
    date,
  })
    .then((result) => {
      if (result) {
        res.status(400).json({
          message: 'Member already subscribed to the class',
          error: true,
        });
      } else {
        Subscription.create({
          classId,
          memberId,
          date,
        })
          .then((newSub) => res.status(201).json({
            message: 'Subscription created succesfully',
            data: newSub,
            error: false,
          }))
          .catch(() => res.status(500).json({
            message: 'An error ocurred',
            data: undefined,
            error: true,
          }));
      }
    });
};

const updateSub = (req, res) => {
  const { id } = req.params;
  const { classId, memberId, date } = req.body;

  if (!id.match(regexObjectId)) {
    res.status(404).json({
      message: 'Please put a valid ID!',
      data: undefined,
      error: true,
    });
  }

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
        res.status(404).json({
          message: `Subscription with id: ${id} was not found`,
          data: undefined,
          error: true,
        });
      }
      res.status(200).json({
        message: `Subscription with id: ${id} was succesfully updated`,
        data: result,
        error: false,
      });
    })
    .catch(() => res.status(500).json({
      message: 'An error ocurred!',
      data: undefined,
      error: true,
    }));
};

const deleteSub = (req, res) => {
  const { id } = req.params;

  if (!id.match(regexObjectId)) {
    res.status(404).json({
      message: 'Please put a valid ID!',
      data: undefined,
      error: true,
    });
  }

  Subscription.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: `Subscription with id: ${id} was not found`,
          data: undefined,
          error: true,
        });
      }
      res.status(200).json({
        message: `Subscription with id: ${id} was succesfully deleted`,
        data: result,
        error: false,
      });
    })
    .catch(() => res.status(500).json({
      message: 'An error ocurred!',
      data: undefined,
      error: true,
    }));
};

module.exports = {
  getAllSub,
  getAllSubThisWeek,
  getSubById,
  createSub,
  updateSub,
  deleteSub,
};
