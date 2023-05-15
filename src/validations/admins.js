const Joi = require('joi');

const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const validateUpdate = (req, res, next) => {
  const adminValidation = Joi.object({
    firstName: Joi.string().min(3).max(15),
    lastNAme: Joi.string().min(3).max(15),
    dni: Joi.number().min(5000000).max(99999999),
    phone: Joi.number().min(10000000).max(999999999999),
    email: Joi.string().regex(emailRegex),
    city: Joi.string(),
    password: Joi.string().regex(passwordRegex),
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
  validateUpdate,
};
