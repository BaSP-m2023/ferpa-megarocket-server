import Joi from 'joi';

const validateClassCreation = (res, req, next) => {
  const validateCreation = Joi.object({
    day: Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday').required(),
    hour: Joi.string().pattern(/^((0[9]|1[0-9]|2[01]):00)$/).required().messages({
      'string.pattern.base': "The schedule must be from 9:00  to 21:00  o'clock.",
    }),
    trainerId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/).required(),
    activityId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/).required(),
    subscribers: Joi.array().items(
      Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    ).max(20)
      .required(),
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
    hour: Joi.string().pattern(/^((0[9]|1[0-9]|2[01]):00)$/).messages({
      'string.pattern.base': "The schedule must be from 9:00  to 21:00  o'clock.",
    }),
    trainerId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/),
    activityId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/),
    subscribers: Joi.array().items(
      Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    ).max(20),
  });

  const validation = classValidation.validate(req.body);

  if (!validation.error) return next();

  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

export default {
  validateClassCreation,
  validateClassUpdate,
};
