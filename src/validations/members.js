const Joi = require('joi');

const validateUpdate = (req, res, next) => {
  const memberValidation = Joi.object({
    firstName: Joi.string().min(2).max(30).pattern(/^[A-Za-z]+$/),
    lastName: Joi.string().min(2).max(30).pattern(/^[A-Za-z]+$/),
    dni: Joi.number().min(1000).max(1000000000000).integer(),
    phone: Joi.number().min(1000).max(1000000000000).integer(),
    email: Joi.string().max(50).email(),
    city: Joi.string().min(3).max(30).pattern(/^[a-zA-Z0-9][a-zA-Z0-9\s]*[a-zA-Z0-9]$/),
    birthDay: Joi.date().max('now'),
    postalCode: Joi.number().min(1000).max(99999).integer(),
    isActive: Joi.boolean(),
    membership: Joi.string().valid('Classic', 'Only Classes', 'Black'),
  });

  const validation = memberValidation.validate(req.body);

  if (!validation.error) {
    return next();
  }
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateUpdate,
};
