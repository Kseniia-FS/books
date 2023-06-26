const express = require("express");
const router = express.Router();
const {
getAll,
getBookByID,
addNewBook,
updateBook,
removeBook,
} = require("../controller/book.controller");
const { validateBook } = require("../middleware/validateBook");
const { bookSchema } = require("../schema/bookSchema");
const { contrWrapper } = require("../helper/contrWrapper");

router.get("/books", contrWrapper(getAll));
router.get("/:id", getBookByID);
router.post("/add", validateBook(bookSchema), addNewBook);
router.put("/post/:id", updateBook);
router.delete("/delete/:id", removeBook);

module.exports = router;
