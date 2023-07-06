const {
  getAllBooks,
  getById,
  addBook,
  updateById,
  removeById,
} = require('../service/book.service');
const { ErrorHandling } = require('../helper');
const {contrWrapper}=require('../helper')

const getAll = async (req, res) => {
  const { user } = req;
  const result = await getAllBooks(user._id);
  if (!result) throw ErrorHandling(404, 'Not Fount');
  res.json(result);
};

const getBookByID = async (req, res) => {
  const { id } = req.params;
  const result = await getById(id);
  if (!result) throw ErrorHandling(404, 'Not Fount');
  res.json(result);
};

const addNewBook = async (req, res) => {
  const { user } = req;
  const result = await addBook(req.body, user._id);
  if (!result) throw ErrorHandling(400, 'Bad Request');
  res.status(201).json(result);
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const result = await updateById(id, req.body);
  if (!result) throw ErrorHandling(404, 'Not Fount');
  res.json(result);
};

const updateFavoriteBook = async (req, res) => {
  const { id } = req.params;
  const result = await updateById(id, req.body);
  if (!result) throw ErrorHandling(404, 'Not Fount');
  res.json(result);
};

const removeBook = async (req, res) => {
  const { id } = req.params;
  const result = await removeById(id);
  if (!result) throw ErrorHandling(404, 'Not Fount');
  res.json(result);
};

module.exports = {
  getAllBooks:contrWrapper(getAll),
  getBookByID,
  addNewBook,
  updateBook,
  removeBook,
  updateFavoriteBook,
};
