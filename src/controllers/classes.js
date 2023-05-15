const Class = require('../models/Class');

const getAllClasses = (req, res) => {
  Class.find()
    .then((classes) => res.status(200).json({
      messege: 'Class list',
      data: classes,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      messege: 'Error',
      error,
    }));
};

const getClassById = (req, res) => {
  const { id } = req.params;

  Class.findById(id)
    .then((classes) => res.status(200).json({
      messege: `Class found! It was ${classes.activityId}`,
      data: classes,
      error: false,
    }))
    .catch((error) => res.json({
      messsege: "Error, Class don't found",
      data: undefined,
      error,
    }));
};

const createClass = (req, res) => {
  const {
    id, day, hour, trainerId, activityId, slots,
  } = req.body;

  Class.create({
    id,
    day,
    hour,
    trainerId,
    activityId,
    slots,
  })
    .then((classes) => res.status(200).json({
      messege: 'Class created!',
      data: classes,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      messege: "Error, don't created",
      data: undefined,
      error,
    }));
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
};
