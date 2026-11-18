const helmet = require('helmet');
const cors = require('cors');

const configureSecurityHeaders = (app) => {
  app.use(helmet());
  app.use(cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));
};

module.exports = { configureSecurityHeaders };