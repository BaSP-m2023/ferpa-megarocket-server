const Joi = require('joi');

const validateMemberUpdate = (req, res, next) => {
  const memberValidation = Joi.object({
    firstName: Joi.string().min(2).max(30),
    lastName: Joi.string().min(2).max(30),
    dni: Joi.string().min(8).max(12),
    phone: Joi.string().min(6).max(20),
    email: Joi.string().max(50).email(),
    city: Joi.string().min(2).max(30),
    birthDay: Joi.date().max('now'),
    postalCode: Joi.string().min(4).max(6),
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
  validateMemberUpdate,
};
