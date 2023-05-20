const Joi = require('joi');

const dateRegex = /\d{4}-\d{2}-\d{2}/;
const regexObjectId = /^[0-9a-fA-F]{24}$/;

const validateSubCreation = (req, res, next) => {
  const subValidation = Joi.object({
    _class: Joi.string().regex(regexObjectId).required(),
    member: Joi.string().regex(regexObjectId).required(),
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
    _class: Joi.string().regex(regexObjectId),
    member: Joi.string().regex(regexObjectId),
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
