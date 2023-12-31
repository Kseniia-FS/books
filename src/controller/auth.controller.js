const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');
require('dotenv').config();

const { User } = require('../model/user');
const ErrorHandling = require('../helper/errorReq');
const sendEmail = require('../helper/sendEmail');

const { SECRET_KEY } = process.env;
const { PORT } = process.env;

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw ErrorHandling(409, 'Such user exists');
  }

  const avatarURL = gravatar.url(email);
  const verificationCode = nanoid();
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    avatar_url: avatarURL,
    verification_code: verificationCode,
  });

  const mail = {
    to: email,
    subject: 'Verify your email',
    html: `<a href="http://localhost:${PORT}/auth/verify/${verificationCode}">Press here</a>`,
  };
  await sendEmail(mail);
  res.status(201).json({
    name: newUser.name,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw ErrorHandling(401);
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw ErrorHandling(401, 'Email or password wrong');
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });
  res.json({
    message: 'User logout',
  });
};

const getCurrent = async (req, res) => {
  const { name } = req.user;
  res.json({ name, message: 'Token is valid' });
};

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const extention = originalname.split('.').pop();
  const filename = `${_id}.${extention}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join('avatars', filename);
  await User.findByIdAndUpdate(_id, { avatar_url: avatarURL });

  res.json({
    avatarURL,
  });
};

const verifyEmail = async (req, res) => {
  const { verificatioCode } = req.params;
  const user = await User.findOne({ verificatioCode });

  if (!user) {
    throw ErrorHandling(404, 'User not found');
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verification_code: '',
  });
  res.json({
    message: 'Email verified',
  });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw ErrorHandling(404, 'User not found');
  }

  if (user.verify) {
    throw ErrorHandling(400, 'User already verified');
  }

  const mail = {
    to: email,
    subject: 'Verify your email',
    html: `<a href="http://localhost:${PORT}/auth/verify/${user.verification_code}">Press here</a>`,
  };
  await sendEmail(mail);
  res.json({
    message: 'Verify email has been sent',
  });
};

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};
