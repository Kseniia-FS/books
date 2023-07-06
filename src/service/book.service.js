const { Book } = require('../model/book');

const getAllBooks = async (user_id) => {
  const data = await Book.find({ user_id }, '-createdAt -updatedAt').populate(
    'user_id',
    'name',
  );
  return data;
};

const getById = async (id) => {
  const book = await Book.findById(id);
  return book;
};

const addBook = async (data, user_id) => {
  const newBook = await Book.create({ ...data, user_id });
  return newBook;
};

const updateById = async (id, data) => {
  const result = await Book.findByIdAndUpdate(id, data, { new: true });
  return result;
};

const removeById = async (id) => {
  const result = await Book.findByIdAndRemove(id);
  return result;
};

module.exports = {
  getAllBooks,
  getById,
  addBook,
  updateById,
  removeById,
};
