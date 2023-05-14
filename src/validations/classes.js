const Joi = require('joi');

const validateCreation = (res, req, next) => {
  const classValidation = Joi.object({
    id: Joi.number().require(),
    day: Joi.string().min(4).max(10).require(),
    hour: Joi.number().require(),
    treiner: Joi.string().min(4).max(15).require(),
    activity: Joi.string().min(4).max(15).require(),
    slots: Joi.number().require(),
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
