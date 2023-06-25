import Joi from 'joi';

const dateRegex = /\d{4}-\d{2}-\d{2}/;

const validateSubCreation = (req, res, next) => {
  const subValidation = Joi.object({
    classId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/).required(),
    memberId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/).required(),
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
    memberId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/),
    classId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/),
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

export default {
  validateSubCreation,
  validateSubUpdate,
};
