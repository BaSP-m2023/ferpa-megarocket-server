const Joi = require('joi');

const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const validateTrainerUpdate = (req, res, next) => {
  const trainerValidation = Joi.object({
    firstName: Joi.string().min(3).max(30),
    lastName: Joi.string().min(3).max(30),
    dni: Joi.string().min(8).max(10),
    phone: Joi.string().min(8).max(12),
    email: Joi.string().email(),
    city: Joi.string().min(3).max(30),
    password: Joi.string().regex(passRegex),
    salary: Joi.number(),
    isActive: Joi.boolean(),
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
  validateTrainerUpdate,
};
