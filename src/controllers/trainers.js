const Trainer = require('../models/Trainer');

const getAllTrainers = (req, res) => {
  Trainer.find()
    .then((trainers) => res.status(200).json({
      message: 'Trainers list',
      data: trainers,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: 'An error ocurred',
      error,
    }));
};

const getTrainerById = (req, res) => {
  const { id } = req.params;

  Trainer.findById(id)
    .then((trainer) => {
      if (!trainer) {
        res.status(404).json({
          message: `Trainers with the id ${id} was not found`,
          error: false,
        });
      } else {
        res.status(200).json({
          message: `Trainers with the id ${id} was succesfully found`,
          data: trainer,
          error: false,
        });
      }
    })
    .catch((error) => res.json({
      message: 'An error ocurred',
      error,
    }));
};

const createTrainer = (req, res) => {
  const {
    firstName, lastName, dni, phone, email, city, password, salary, isActive,
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
    isActive,
  })
    .then((trainer) => res.status(201).json({
      message: 'Trainer was succesfully created',
      data: trainer,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      message: 'An error ocurred',
      error,
    }));
};

module.exports = {
  getAllTrainers,
  createTrainer,
  getTrainerById,
};
