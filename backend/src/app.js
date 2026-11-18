const express = require('express');
const cookieParser = require('cookie-parser');
const { configureSecurityHeaders } = require('./middlewares/security.middleware');
const { apiLimiter, authLimiter } = require('./middlewares/rateLimiter');
const authController = require('./controllers/auth.controller');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
configureSecurityHeaders(app);

app.use('/api/', apiLimiter);

app.post('/api/auth/register', authLimiter, authController.register);
app.post('/api/auth/login', authLimiter, authController.login);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur sécurisé à l écoute sur le port ${PORT}`);
});