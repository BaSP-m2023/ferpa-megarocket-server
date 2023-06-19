const Joi = require('joi');

const letterRegex = /^[a-zA-Z]{3}[a-zA-Z\s]*$/;

const createValidation = (req, res, next) => {
  const activityToValidate = Joi.object({
    name:
    Joi.string()
      .regex(letterRegex)
      .min(3)
      .max(30)
      .required()
      .messages({
        'string.pattern.base': 'Activity name must contain only letters',
      }),
    description:
    Joi.string()
      .regex(letterRegex)
      .min(5)
      .max(250)
      .required()
      .messages({
        'string.pattern.base': 'Activity description must contain only letters',
      }),
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
    name:
    Joi.string()
      .regex(letterRegex)
      .min(3)
      .max(30)
      .messages({
        'string.pattern.base': 'Activity name must contain only letters',
      }),
    description:
    Joi.string()
      .regex(letterRegex)
      .min(5)
      .max(250)
      .messages({
        'string.pattern.base': 'Activity description must contain only letters',
      }),
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
