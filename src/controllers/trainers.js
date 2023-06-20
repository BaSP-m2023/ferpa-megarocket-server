const Trainer = require('../models/Trainer');

const regexObjectId = /^[0-9a-fA-F]{24}$/;

const getAllTrainers = (req, res) => {
  Trainer.find()
    .then((trainers) => res.status(200).json({
      message: 'Trainers list.',
      data: trainers,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: 'An error ocurred.',
      error,
    }));
};

const getTrainerById = (req, res) => {
  const { id } = req.params;

  if (id.length !== 24) {
    return res.status(400).json({
      message: 'Invalid id, try again',
      data: undefined,
      error: true,
    });
  }
  Trainer.findById(id)
    .then((trainer) => {
      if (!trainer) {
        return res.status(404).json({
          message: `Trainers with the id ${id} was not found.`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: `Trainers with the id ${id} was succesfully found.`,
        data: trainer,
        error: false,
      });
    })
    .catch((error) => {
      res.json({
        message: 'An error ocurred.',
        data: undefined,
        error,
      });
    });
  return false;
};

const createTrainer = (req, res) => {
  const {
    firstName, lastName, dni, phone, email, city, password, salary,
  } = req.body;

  Trainer.create({
    firstName,
    lastName,
    dni,
    phone,
    email,
    city,
    password,
    salary,
  })
    .then((trainer) => res.status(201).json({
      message: 'Trainer has been succesfully created.',
      data: trainer,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      message: 'An error ocurred.',
      error,
    }));
};

const deleteTrainer = (req, res) => {
  const { id } = req.params;
  if (!id.match(regexObjectId)) {
    res.status(400).json({
      message: 'Id invalid, try again!',
      data: undefined,
      error: true,
    });
  } else {
    Trainer.findByIdAndDelete(id)
      .then((result) => {
        if (!result) {
          return res.status(404).json({
            message: `Trainer with id ${id} was not found`,
            data: undefined,
            error: true,
          });
        }
        return res.status(200).json({
          message: 'Trainer has been succesfully deleted.',
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
      data: undefined,
      error: true,
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
            data: undefined,
            error: true,
          });
        }
        return res.status(200).json({
          message: 'Trainer has been succesfully updated',
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
  getAllTrainers,
  createTrainer,
  getTrainerById,
  updateTrainer,
  deleteTrainer,
};
