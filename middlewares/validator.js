const Joi = require('joi');
const joi = require('joi');

exports.signupSchema = joi.object({
  email: joi.string()
    .min(6)
    .max(60).
    required()
    .email({
      tlds: { allow: ['com', 'net'] }
    }),
  password: joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&_#])[A-Za-z\\d@$!%*?&_#]{8,}$'))
})

exports.signinSchema = joi.object({
  email: joi.string()
    .min(6)
    .max(60).
    required()
    .email({
      tlds: { allow: ['com', 'net'] }
    }),
  password: joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&_#])[A-Za-z\\d@$!%*?&_#]{8,}$'))
})

exports.acceptorCodeSchema = Joi.object({
  email: joi.string()
    .min(6)
    .max(60).
    required()
    .email({
      tlds: { allow: ['com', 'net'] }
    }),
  providedCode: Joi.number()
  .required()
})

exports.changePasswordSchema = Joi.object({
  newPassword: joi.string()
  .required()
  .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&_#])[A-Za-z\\d@$!%*?&_#]{8,}$')),

  oldPassword: joi.string()
  .required()
  .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&_#])[A-Za-z\\d@$!%*?&_#]{8,}$'))
})

exports.acceptFPCodeSchema = Joi.object({
  email: joi.string()
    .min(6)
    .max(60).
    required()
    .email({
      tlds: { allow: ['com', 'net'] }
    }),
  providedCode: Joi.number()
  .required(),

  newPassword: joi.string()
  .required()
  .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&_#])[A-Za-z\\d@$!%*?&_#]{8,}$'))
})