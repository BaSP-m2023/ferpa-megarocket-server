const Joi = require('joi');

const passRegex = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;

const validateSuperCreation = (req, res, next) => {
  const superAdminValidation = Joi.object({
    email: Joi.string().email().required(),
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
    email: Joi.string().email(),
    password: Joi.string().regex(passRegex),
  });

  const validation = superValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There is an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateSuperCreation,
  validateSuperUpdate,
};
