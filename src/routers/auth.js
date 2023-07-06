const express = require('express');
const { validateBody, authMiddleware } = require('../middleware/');
const { schemas } = require('../model/user');
const {
  register,
  login,
  logout,
  getCurrent,
} = require('../controller/auth.controller');
const { contrWrapper } = require('../helper');

const router = express.Router();

router.post(
  '/register',
  validateBody(schemas.registerSchema),
  contrWrapper(register),
);

router.post('/login', validateBody(schemas.loginSchema), contrWrapper(login));
router.post('/logout', authMiddleware, contrWrapper(logout));
router.get('/current', authMiddleware, contrWrapper(getCurrent));

module.exports = router;
