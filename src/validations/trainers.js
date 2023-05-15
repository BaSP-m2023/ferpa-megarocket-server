const Joi = require('joi');

const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const validateTrainerCreation = (req, res, next) => {
  const trainerValidation = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    dni: Joi.string().min(8).max(10).required(),
    phone: Joi.string().min(8).max(12).required(),
    email: Joi.string().email().required(),
    city: Joi.string().min(3).max(30).required(),
    password: Joi.string().regex(passRegex).required(),
    salary: Joi.number().required(),
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
};
