const Joi = require('joi');

const now = new Date().toISOString().split('T')[0];

const validateSubCreation = (req, res, next) => {
  const subValidation = Joi.object({
    memberId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/).required(),
    classId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/).required(),
    date: Joi.date().min(now).required().message({
      'date.min': 'You cannot subscribe to classes that have already occurred.',
    }),
  });

  const validation = subValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There as an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateSubUpdate = (req, res, next) => {
  const subValidation = Joi.object({
    memberId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/),
    classId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/),
    date: Joi.date().min(now).message({
      'date.min': 'You cannot subscribe to classes that have already occurred.',
    }),
  });

  const validation = subValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There as an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateSubCreation,
  validateSubUpdate,
};
