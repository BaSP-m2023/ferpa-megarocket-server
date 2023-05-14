const Joi = require('joi');

const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const validateUpdate = (req, res, next) => {
  const trainerValidation = Joi.object({
    firstName: Joi.string().min(3).max(30),
    lastName: Joi.string().min(3).max(30),
    dni: Joi.number().min(5000000).max(99999999),
    phone: Joi.number().min(10000000).max(999999999999),
    email: Joi.string().regex(emailRegex),
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
  validateUpdate,
};
