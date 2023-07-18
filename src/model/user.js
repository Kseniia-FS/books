const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseErrors } = require('../helper');

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    token: {
      type: String,
      default: '',
    },
    avatar_url: {
      type: String,
      required: true,
    },
    verification_code: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post('save', handleMongooseErrors);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const verifySchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  verifySchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
