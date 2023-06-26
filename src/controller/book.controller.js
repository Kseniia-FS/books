const {
getAllBooks,
getById,
addBook,
updateById,
removeById,
} = require("../service/book.service");
const { ErrorHandling } = require("../helper/errorReq");

const getAll = async (req, res) => {
const result = await getAllBooks();
if (!result) throw ErrorHandling(404, "Not Fount");
res.json(result);
};

const getBookByID = async (req, res) => {
const { id } = req.params;
const result = await getById(id);
if (!result) throw ErrorHandling(404, "Not Fount");
res.json(result);
};

const addNewBook = async (req, res) => {
const result = await addBook(req.body);
if (!result) throw ErrorHandling(404, "Not Fount");
res.json(result);
};

const updateBook = async (req, res) => {
const { id } = req.params;
const result = await updateById(id, req.body);
if (!result) throw ErrorHandling(404, "Not Fount");
res.json(result);
};

const removeBook = async (req, res) => {
const { id } = req.params;
const result = await removeById(id);
res.json(result);
};

module.exports = { getAll, getBookByID, addNewBook, updateBook, removeBook };
