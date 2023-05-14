const Joi = require('joi');

const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const validateCreation = (req, res, next) => {
  const trainerValidation = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    dni: Joi.number().min(5000000).max(99999999).required(),
    phone: Joi.number().min(10000000).max(999999999999).required(),
    email: Joi.string().regex(emailRegex).required(),
    city: Joi.string().min(3).max(30).required(),
    password: Joi.string().regex(passRegex).required(),
    salary: Joi.number().required(),
    isActive: Joi.boolean().required(),
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
  validateCreation,
};
