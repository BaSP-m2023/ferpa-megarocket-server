const Joi = require('joi');

const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
const passRegex = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;

const validateCreation = (req, res, next) => {
  const superAdminValidation = Joi.object({
    email: Joi.string().email().regex(emailRegex).required(),
    password: Joi.string().regex(passRegex).required(),
  });

  const validation = superAdminValidation.validate(req.body);
  if (!validation.error) return next();
  return res.status(400).json({
    message: `there is an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateSuperUpdate = (req, res, next) => {
  const superValidation = Joi.object({
    id: Joi.number(),
    email: Joi.string().regex(emailRegex),
    password: Joi.string().regex(passRegex),
  });

  const validation = superValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There as an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateCreation,
  validateSuperUpdate,
};
