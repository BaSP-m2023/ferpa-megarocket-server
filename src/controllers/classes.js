const Class = require('../models/Class');

const createClass = (req, res) => {
  const {
    id, day, hour, trainer, activity, slots,
  } = req.body;

  Class.create({
    id,
    day,
    hour,
    trainer,
    activity,
    slots,
  })

    .then((result) => res.status(201).json(result))
    .catch((error) => res.status(400).json({
      messege: "Error, don't created",
      error,
    }));
};

const updateClass = (req, res) => {
  const { id } = req.params;
  const {
    day,
    hour,
    trainer,
    activity,
    slots,
  } = req.body;

  Class.findByIdAndUpdate(
    id,
    {
      id,
      day,
      hour,
      trainer,
      activity,
      slots,
    },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Class with id: ${id} was not found`,
        });
      }
      return res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

const deleteClass = (req, res) => {
  const { id } = req.params;

  Class.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Class with id: ${id} was not found`,
        });
      }
      return res.status(200).json({
        message: `Class with id: ${id} was deteled`,
      });
    })
    .catch((error) => res.status(400).json({
      message: 'An error ocurred!',
      error,
    }));
};

module.exports = {
  createClass,
  updateClass,
  deleteClass,
};
