const validateBody = require('./validateBook');
const authMiddleware = require('./auth');
const upload = require('./upload');

module.exports = {
  validateBody,
  authMiddleware,
  upload,
};
