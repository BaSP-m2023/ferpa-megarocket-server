const Class = require('../models/Class');

const getAllClasses = (req, res) => {
  Class.find()
    .then((classes) => res.status(200).json({
      messege: 'Complete the class list',
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
      messege: `Class found! It was ${classes.activity}`,
      data: classes,
      error: false,
    }))
    .catch((error) => res.json({
      messsege: "Error, don't found",
      error,
    }));
};

const createClass = (req, res) => {
  const {
    id, day, hour, treiner, activity, slots,
  } = req.body;

  Class.create({
    id,
    day,
    hour,
    treiner,
    activity,
    slots,
  })
    .then((result) => res.status(201).json(result))
    .catch((error) => res.status(400).json({
      messege: "Error, don't created",
      error,
    }));
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
};
