const Joi = require('joi');

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const numberDNILength = (number, helpers) => {
  if (number.toString().length === 9) {
    return number;
  } return helpers.message('Dni must be 9 numbers');
};
const numberPhoneLength = (number, helpers) => {
  if (number.toString().length === 10) {
    return number;
  } return helpers.message('Phone must be 10 numbers');
};

const validateAdminUpdate = (req, res, next) => {
  const adminValidation = Joi.object({
    firstName: Joi.string().min(3).max(15),
    lastName: Joi.string().min(3).max(15),
    dni: Joi.number().custom((number, helpers) => (numberDNILength(number, helpers))),
    phone: Joi.number().custom((number, helpers) => (numberPhoneLength(number, helpers))),
    email: Joi.string().email(),
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
  validateAdminUpdate,
};
