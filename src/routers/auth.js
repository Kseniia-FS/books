const express = require('express');
const { validateBody, authMiddleware, upload } = require('../middleware/');
const { schemas } = require('../model/user');
const {
  register,
  login,
  logout,
  getCurrent,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
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
router.patch(
  '/avatars',
  authMiddleware,
  upload.single('avatar'),
  contrWrapper(updateAvatar),
);
router.get('/verify/:verificatioCode', contrWrapper(verifyEmail));
router.post(
  '/verify',
  validateBody(schemas.verifySchema),
  contrWrapper(resendVerifyEmail),
);
module.exports = router;
