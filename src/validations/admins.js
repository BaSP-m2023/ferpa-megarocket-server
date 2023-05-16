const Joi = require('joi');

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const validateAdminCreation = (req, res, next) => {
  const adminValidation = Joi.object({
    firstName: Joi.string().min(3).max(15).required(),
    lastName: Joi.string().min(3).max(15).required(),
    dni: Joi.string().min(8).max(10).required(),
    phone: Joi.string().min(8).max(12).required(),
    email: Joi.string().email().required(),
    city: Joi.string().required(),
    password: Joi.string().regex(passwordRegex).required(),
  });

  const validation = adminValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateAdminCreation,
};
