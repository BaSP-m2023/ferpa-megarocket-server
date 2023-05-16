const Class = require('../models/Class');

const regexObjectId = /^[0-9a-fA-F]{24}$/;

const getAllClasses = (req, res) => {
  Class.find()
    .then((classes) => res.status(200).json({
      message: 'Class list',
      data: classes,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      message: 'Error',
      error,
    }));
};

const getClassById = (req, res) => {
  const { id } = req.params;
  if (!id.match(regexObjectId)) {
    res.status(400).json({
      message: 'ID invalid, please correct',
      data: undefined,
      error: true,
    });
  }
  Class.findById(id)
    .then((classes) => {
      if (!classes) {
        res.status(400).json({
          message: `Class with the ${id} don't found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: `Class found! It was ${id}`,
        data: classes,
        error: false,
      })
        .catch((error) => res.json({
          message: 'Error',
          data: undefined,
          error,
        }));
    });
};

const createClass = (req, res) => {
  const {
    day, hour, trainerId, activityId, slots,
  } = req.body;

  Class.create({
    day,
    hour,
    trainerId,
    activityId,
    slots,
  })
    .then((classes) => res.status(200).json({
      message: 'Class created!',
      data: classes,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: "Error, don't created",
      data: undefined,
      error,
    }));
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
};
