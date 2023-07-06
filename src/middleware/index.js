const validateBody = require('./validateBook');
const authMiddleware = require('./auth');

module.exports = {
  validateBody,
  authMiddleware,
};
