const Class = require('../models/Class');

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
  updateClass,
  deleteClass,
};
