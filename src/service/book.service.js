const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const bookspath = path.join(__dirname, "/books.json");

const updateBooks = async (books) =>
await fs.writeFile(bookspath, JSON.stringify(books, null, 2));

const getAllBooks = async () => {
const data = await fs.readFile(bookspath);
return JSON.parse(data);
};

const getById = async (id) => {
const books = await getAllBooks();
const result = books.find((book) => book.id === id);
return result || null;
};

const addBook = async (data) => {
const books = await getAllBooks();
const newBook = {
id: nanoid(),
...data,
};
books.push(newBook);
await updateBooks(books);
return newBook;
};

const updateById = async (id, data) => {
const books = await getAllBooks();
const bookIndex = books.findIndex((el) => el.id === id);
books[bookIndex] = { ...books[bookIndex], ...data };
await updateBooks(books);
return books[bookIndex] || null;
};

const removeById = async (id) => {
const books = await getAllBooks();
const bookIndex = books.findIndex((el) => el.id === id);

const [result] = books.splice(bookIndex, 1);
await updateBooks(books);
return result;
};

module.exports = { getAllBooks, getById, addBook, updateById, removeById };
