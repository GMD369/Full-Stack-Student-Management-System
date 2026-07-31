const jwt = require('jsonwebtoken');
const User = require('../models/User');

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

function setAuthCookie(res, token) {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('token', token, {
    httpOnly: true,
    secure: isProd,
    // Client and server are on different domains in production, so the
    // cookie must be SameSite=None (requires Secure) to be sent cross-site.
    sameSite: isProd ? 'none' : 'lax',
    maxAge: COOKIE_MAX_AGE,
  });
}

async function register(req, res) {
  const { name, email, password, role } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Email already registered' });

  // Only allow admin role if no admin exists yet, or if requester is already an admin.
  let assignedRole = 'user';
  if (role === 'admin') {
    const adminCount = await User.countDocuments({ role: 'admin' });
    if (adminCount === 0) assignedRole = 'admin';
  }

  const user = await User.create({ name, email, password, role: assignedRole });
  const token = signToken(user._id);
  setAuthCookie(res, token);
  res.status(201).json({ user: user.toSafeObject() });
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid email or password' });

  const match = await user.comparePassword(password);
  if (!match) return res.status(401).json({ message: 'Invalid email or password' });

  const token = signToken(user._id);
  setAuthCookie(res, token);
  res.json({ user: user.toSafeObject() });
}

async function logout(req, res) {
  const isProd = process.env.NODE_ENV === 'production';
  res.clearCookie('token', { httpOnly: true, secure: isProd, sameSite: isProd ? 'none' : 'lax' });
  res.json({ message: 'Logged out' });
}

async function me(req, res) {
  res.json({ user: req.user.toSafeObject() });
}

module.exports = { register, login, logout, me };
