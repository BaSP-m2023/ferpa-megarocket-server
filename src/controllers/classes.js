const Class = require('../models/Class');

const regexObjectId = /^[0-9a-fA-F]{24}$/;

const getAllClasses = (req, res) => {
  Class.find()
    .then((classes) => res.status(200).json({
      message: 'Class list',
      data: classes,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: 'Error',
      error,
    }));
};

const getClassById = (req, res) => {
  const { id } = req.params;
  if (!id.match(regexObjectId)) {
    return res.status(404).json({
      message: 'ID invalid, please correct',
      data: undefined,
      error: true,
    });
  }
  Class.findById(id)
    .then((classes) => {
      if (!classes) {
        return res.status(404).json({
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
  return false;
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

const updateClass = (req, res) => {
  const { id } = req.params;
  if (id.length !== 24) {
    res.status(404).json({
      message: 'ID invalid, please correct',
      data: undefined,
      error: true,
    });
  }
  const {
    day,
    hour,
    trainerId,
    activityId,
    slots,
  } = req.body;
  Class.findByIdAndUpdate(
    id,
    {
      day,
      hour,
      trainerId,
      activityId,
      slots,
    },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: `Class with id: ${id} was not found`,
          data: undefined,
          error: true,
        });
      } else {
        res.status(200).json({
          message: `Class with id: ${id} was found!`,
          data: result,
          error: false,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error ocurred!',
        error,
      });
    });
};

const deleteClass = (req, res) => {
  const { id } = req.params;

  Class.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Class with id: ${id} was not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: `Class with id: ${id} was deleted`,
        data: result,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({
      message: 'An error ocurred!',
      error,
    }));
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
};
