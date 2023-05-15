const Trainer = require('../models/Trainer');

const regexObjectId = /^[0-9a-fA-F]{24}$/;

const deleteTrainer = (req, res) => {
  const { id } = req.params;
  if (!id.match(regexObjectId)) {
    res.status(400).json({
      message: 'Id invalid, try again!',
    });
  } else {
    Trainer.findByIdAndDelete(id)
      .then((result) => {
        if (!result) {
          return res.status(404).json({
            message: `Trainer with id ${id} was not found`,
            error: true,
          });
        }
        return res.status(200).json({
          message: `Trainer with id: ${id} was succesfully deleted.`,
          error: false,
        });
      })
      .catch((error) => res.status(500).json({
        message: 'An error ocurred!',
        error,
      }));
  }
};

const updateTrainer = (req, res) => {
  const { id } = req.params;
  if (!id.match(regexObjectId)) {
    res.status(400).json({
      message: 'Id invalid, try again!',
    });
  } else {
    const {
      firstName, lastName, dni, phone, email, city, password, salary, isActive,
    } = req.body;

    Trainer.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        dni,
        phone,
        email,
        city,
        password,
        salary,
        isActive,
      },
      { new: true },
    )
      .then((result) => {
        if (!result) {
          return res.status(404).json({
            message: `Trainer with id ${id} was not found`,
            error: true,
          });
        }
        return res.status(200).json({
          message: `Trainer with id: ${id} was succesfully updated`,
          data: result,
          error: false,
        });
      })
      .catch((error) => res.status(500).json({
        message: 'An error ocurred!',
        error,
      }));
  }
};

module.exports = {
  updateTrainer,
  deleteTrainer,
};
