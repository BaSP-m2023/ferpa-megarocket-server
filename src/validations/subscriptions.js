const Joi = require('joi');

const validateSubCreation = (req, res, next) => {
  const subValidation = Joi.object({
    class: Joi.number().required(),
    memeber: Joi.number().required(),
    date: Joi.date().format('DD-MM-YYYY').required(),
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
    class: Joi.number(),
    memeber: Joi.number(),
    date: Joi.date().format('DD-MM-YYYY'),
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
