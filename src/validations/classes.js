const Joi = require('joi');

const validateClassCreation = (res, req, next) => {
  const validateCreation = Joi.object({
    day: Joi.string().valid('Monday', 'Wednesday', 'Friday').required(),
    hour: Joi.number().min(0).max(23).required(),
    trainerId: Joi.string().min(4).max(15).required(),
    activityId: Joi.string().min(4).max(15).required(),
    slots: Joi.number().required(),
  });

  const validation = validateCreation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `Error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateClassCreation,
};
