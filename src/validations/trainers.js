const Joi = require('joi');

const validateTrainerCreation = (req, res, next) => {
  const trainerValidation = Joi.object({
    firstName: Joi.string().min(3).max(15).pattern(/^[a-zA-Z-]+$/)
      .required(),
    lastName: Joi.string().min(3).max(15).pattern(/^[a-zA-Z-]+$/)
      .required(),
    dni: Joi.number()
      .min(1000000)
      .max(99999999).required(),
    phone: Joi.number()
      .min(1000000000)
      .max(9999999999).required(),
    email: Joi.string().pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/).required(),
    city: Joi.string().min(2).max(30).required(),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/).required(),
    salary: Joi.number().min(500).required(),
  });
  const validation = trainerValidation.validate(req.body);
  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateTrainerUpdate = (req, res, next) => {
  const trainerValidation = Joi.object({
    firstName: Joi.string().min(3).max(15).pattern(/^[a-zA-Z-]+$/),
    lastName: Joi.string().min(3).max(15).pattern(/^[a-zA-Z-]+$/),
    dni: Joi.number()
      .min(1000000)
      .max(99999999),
    phone: Joi.number()
      .min(1000000000)
      .max(9999999999),
    email: Joi.string().pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/),
    city: Joi.string().min(2).max(30),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/),
    salary: Joi.number().min(10000),
  });
  const validation = trainerValidation.validate(req.body);
  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateTrainerCreation,
  validateTrainerUpdate,
};
