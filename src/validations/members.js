import Joi from 'joi';

const letterRegex = /^[A-Za-z]+$/;
const numberRegex = /^[0-9]+$/;
const spacesRegex = /^[^\s]+$/;

const validateMemberCreation = (req, res, next) => {
  const memberValidation = Joi.object({
    firstName:
    Joi.string()
      .regex(letterRegex)
      .min(2)
      .max(30)
      .messages({
        'string.pattern.base': 'First name must contain only letters',
      })
      .required(),
    lastName:
     Joi.string()
       .regex(letterRegex)
       .min(2)
       .max(30)
       .messages({
         'string.pattern.base': 'Last name must contain only letters',
       })
       .required(),
    dni:
    Joi.string()
      .regex(numberRegex)
      .min(6)
      .max(9)
      .messages({
        'string.pattern.base': 'DNI must contain only numbers',
      })
      .required(),
    phone:
    Joi.string()
      .regex(numberRegex)
      .min(6)
      .max(20)
      .messages({
        'string.pattern.base': 'Phone number must contain only numbers',
      })
      .required(),
    email:
    Joi.string()
      .max(50)
      .email()
      .required(),
    city:
    Joi.string()
      .min(2)
      .max(30)
      .required(),
    birthDay:
    Joi.date()
      .min('1930-01-01')
      .max('2008-01-01')
      .required(),
    postalCode:
    Joi.string()
      .regex(spacesRegex)
      .min(4)
      .max(6)
      .messages({
        'string.pattern.base': 'Zip must not contain empty spaces',
      })
      .required(),
    isActive:
    Joi.boolean().required(),
    membership:
    Joi.string().valid('Classic', 'Only Classes', 'Black').required(),
  });

  const validation = memberValidation.validate(req.body);

  if (!validation.error) {
    return next();
  }

  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateMemberUpdate = (req, res, next) => {
  const memberValidation = Joi.object({
    firstName:
    Joi.string()
      .regex(letterRegex)
      .min(2)
      .max(30)
      .messages({
        'string.pattern.base': 'First name must contain only letters',
      }),
    lastName:
     Joi.string()
       .regex(letterRegex)
       .min(2)
       .max(30)
       .messages({
         'string.pattern.base': 'Last name must contain only letters',
       }),
    dni:
    Joi.string()
      .regex(numberRegex)
      .min(6)
      .max(9)
      .messages({
        'string.pattern.base': 'DNI must contain only numbers',
      }),
    phone:
    Joi.string()
      .regex(numberRegex)
      .min(6)
      .max(20)
      .messages({
        'string.pattern.base': 'Phone number must contain only numbers',
      }),
    email:
    Joi.string()
      .max(50)
      .email(),
    city:
    Joi.string()
      .min(2)
      .max(30),
    birthDay:
    Joi.date()
      .min('1930-01-01')
      .max('2008-01-01'),
    postalCode:
    Joi.string()
      .regex(spacesRegex)
      .min(4)
      .max(6)
      .messages({
        'string.pattern.base': 'Zip must not contain empty spaces',
      }),
    isActive:
    Joi.boolean(),
    membership:
    Joi.string().valid('Classic', 'Only Classes', 'Black'),
  });

  const validation = memberValidation.validate(req.body);

  if (!validation.error) {
    return next();
  }
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

export default {
  validateMemberCreation,
  validateMemberUpdate,
};
