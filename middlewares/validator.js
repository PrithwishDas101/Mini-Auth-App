const Joi = require('joi');

exports.signupSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ['com', 'net'] }
    }),
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .pattern(/^[a-zA-Z0-9._-]+$/),
  password: Joi.string()
    .required()
    .min(6)
});

exports.signinSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ['com', 'net'] }
    }),
  password: Joi.string()
    .required()
    .min(6)
});

exports.acceptorCodeSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ['com', 'net'] }
    }),
  providedCode: Joi.number().required()
});

exports.changePasswordSchema = Joi.object({
  newPassword: Joi.string()
    .required()
    .min(6),

  oldPassword: Joi.string()
    .required()
    .min(6)
});

exports.acceptFPCodeSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ['com', 'net'] }
    }),
  providedCode: Joi.number().required(),

  newPassword: Joi.string()
    .required()
    .min(6)
});

exports.createPostSchema = Joi.object({
  title: Joi.string()
    .min(6)
    .max(60)
    .required(),

  description: Joi.string()
    .min(1)
    .max(1200)
    .required()
});