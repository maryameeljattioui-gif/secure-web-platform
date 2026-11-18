const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });
    const result = await db.query(
      'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role',
      [email, hashedPassword, role || 'USER']
    );
    res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Erreur serveur.' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ status: 'fail', message: 'Identifiants invalides.' });
    }

    const user = userResult.rows[0];
    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) {
      return res.status(401).json({ status: 'fail', message: 'Identifiants invalides.' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    });

    res.status(200).json({ status: 'success', user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Erreur d authentification.' });
  }
};