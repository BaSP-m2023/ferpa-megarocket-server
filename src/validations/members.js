const Joi = require('joi');

const validateMemberCreation = (req, res, next) => {
  const memberValidation = Joi.object({
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    dni: Joi.string().min(8).max(12).required(),
    phone: Joi.string().min(6).max(20).required(),
    email: Joi.string().max(50).email().required(),
    city: Joi.string().min(2).max(30).required(),
    birthDay: Joi.date().max('now').required(),
    postalCode: Joi.string().min(4).max(6).required(),
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
  validateMemberCreation,
};
