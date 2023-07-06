const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookByID,
  addNewBook,
  updateBook,
  removeBook,
  updateFavoriteBook,
} = require('../controller/book.controller');
const { validateBody, authMiddleware } = require('../middleware/');
const { schemas } = require('../model/book');
const { contrWrapper } = require('../helper');

router.get('/books', authMiddleware, getAllBooks);
router.get('/:id', authMiddleware, contrWrapper(getBookByID));
router.post(
  '/',
  authMiddleware,
  validateBody(schemas.addSchema),
  contrWrapper(addNewBook),
);
router.put(
  '/:id',
  authMiddleware,
  validateBody(schemas.addSchema),
  contrWrapper(updateBook),
);
router.patch(
  '/:id/favorite',
  authMiddleware,
  validateBody(schemas.updateFavoriteSchema),
  contrWrapper(updateFavoriteBook),
);
router.delete('/:id', authMiddleware, contrWrapper(removeBook));

module.exports = router;
