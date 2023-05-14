const Trainer = require('../models/Trainer');

const getAllTrainers = (req, res) => {
  Trainer.find()
    .then((trainers) => res.status(200).json({
      message: 'Trainers list',
      data: trainers,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: 'An ERROR ocurred',
      error,
    }));
};

const getTrainerById = (req, res) => {
  const { id } = req.params;

  Trainer.findById(id, 'firstName lastName dni phone email city password salary isActive')
    .then((trainer) => res.status(200).json({
      message: 'Trainer was found',
      data: trainer,
      error: false,
    }))
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
    .then((result) => res.status(201).json(result))
    .catch((error) => res.status(400).json({
      message: 'An error ocurred!',
      error,
    }));
};

module.exports = {
  getAllTrainers,
  createTrainer,
  getTrainerById,
};
