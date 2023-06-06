const Joi = require('joi');

const validateClassCreation = (res, req, next) => {
  const validateCreation = Joi.object({
    day: Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday').required(),
    hour: Joi.number().min(0).max(23).required(),
    trainerId: Joi.string().max(24).required(),
    activityId: Joi.string().max(24).required(),
    slots: Joi.number().min(1).required(),
  });

  const validation = validateCreation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `Error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateClassUpdate = (req, res, next) => {
  const classValidation = Joi.object({
    day: Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
    hour: Joi.number().min(0).max(23),
    trainerId: Joi.string().max(24),
    activityId: Joi.string().max(24),
    slots: Joi.number().min(1).max(30),
  });

  const validation = classValidation.validate(req.body);

  if (!validation.error) return next();

  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateClassCreation,
  validateClassUpdate,
};
