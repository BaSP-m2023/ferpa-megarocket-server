const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const memberValidation = Joi.object({
    firstName: Joi.string().min(2).max(30).pattern(/^[A-Za-z]+$/)
      .required(),
    lastName: Joi.string().min(2).max(30).pattern(/^[A-Za-z]+$/)
      .required(),
    dni: Joi.number().min(1000).max(1000000000000).integer()
      .required(),
    phone: Joi.number().min(1000).max(1000000000000).integer()
      .required(),
    email: Joi.string().max(50).email().required(),
    city: Joi.string().min(3).max(30).pattern(/^[a-zA-Z0-9][a-zA-Z0-9\s]*[a-zA-Z0-9]$/)
      .required(),
    birthDay: Joi.date().max('now').required(),
    postalCode: Joi.number().min(1000).max(99999).integer()
      .required(),
    isActive: Joi.boolean().required(),
    membership: Joi.string().valid('Classic', 'Only Classes', 'Black').required(),
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
  validateCreation,
};
