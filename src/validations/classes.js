const Joi = require('joi');

const validateCreation = (res, req, next) => {
  const classValidation = Joi.object({
    day: Joi.string().valid('Monday', 'Wednesday', 'Friday').required(),
    hour: Joi.number().min(0).max(23).required(),
    trainerId: Joi.string().min(4).max(15).required(),
    activityId: Joi.string().min(4).max(15).required(),
    slots: Joi.number().required(),
  });

  const validation = classValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    messege: `Error: ${validation.error.details[0].msg}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateCreation,
};
