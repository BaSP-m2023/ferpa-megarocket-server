const Joi = require('joi');

const dateRegex = /^\d{2}-\d{2}-\d{4}$/;

const validateSubCreation = (req, res, next) => {
  const subValidation = Joi.object({
    classId: Joi.number().required(),
    memberId: Joi.number().required(),
    date: Joi.string().regex(dateRegex).required(),
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
    classId: Joi.number(),
    memberId: Joi.number(),
    date: Joi.string().regex(dateRegex),
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
