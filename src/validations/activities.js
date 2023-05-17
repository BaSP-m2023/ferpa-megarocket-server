const Joi = require('joi');

const createValidation = (req, res, next) => {
  const activityToValidate = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(5).max(250).required(),
    isActive: Joi.boolean().required(),
  });
  const valid = activityToValidate.validate(req.body);

  if (!valid.error) {
    return next();
  }
  return res.status(400).json({
    message: 'There is something wrong',
    data: undefined,
    error: true,
  });
};
const updateValidation = (req, res, next) => {
  const activityToValidate = Joi.object({
    name: Joi.string().min(3).max(30),
    description: Joi.string().min(5).max(250),
    isActive: Joi.boolean(),
  });
  const validation = activityToValidate.validate(req.body);

  if (!validation.error) {
    return next();
  }
  return res.status(400).json({
    message: 'There is something wrong',
    data: undefined,
    error: true,
  });
};

module.exports = {
  createValidation,
  updateValidation,
};
