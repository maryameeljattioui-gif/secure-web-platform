const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { status: 429, message: 'Trop de requêtes, réessayez plus tard.' }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { status: 429, message: 'Tentatives d authentification dépassées.' }
});

module.exports = { apiLimiter, authLimiter };