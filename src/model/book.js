const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseErrors } = require('../helper');

const genres = ['fantastic', 'love'];
const isbnRegexp = /^\d{2}-\d{2}-\d{4}$/;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    genre: {
      type: String,
      enum: genres,
      required: true,
    },
    date: {
      type: String,
      match: isbnRegexp,
      unique: true,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

bookSchema.post('save', handleMongooseErrors);

const addSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  favorite: Joi.boolean().required(),
  genre: Joi.string().valid(...genres),
  date: Joi.string().pattern(isbnRegexp).required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Book = model('book', bookSchema);

module.exports = {
  Book,
  schemas,
};
