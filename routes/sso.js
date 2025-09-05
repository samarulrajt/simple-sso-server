const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'sso_secret';
const REDIRECT_URI = 'http://localhost:4200/auth-callback'; // Angular redirect

// Login page
router.get('/login', (req, res) => {
  const { redirect_uri } = req.query;
  res.render('login', { redirect_uri });
});

// Handle login form
router.post('/login', (req, res) => {
  const { username, role, redirect_uri } = req.body;
  if (!username) return res.status(400).send('Missing username');

  const payload = { sub: username, name: username, roles: [role || 'User'] };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

  // Redirect back to Angular with token
  const redirectUrl = `${redirect_uri}?access_token=${token}`;
  res.redirect(redirectUrl);
});

// Optional endpoint to verify token (for API calls)
router.get('/verify', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    res.json(decoded);
  });
});

module.exports = router;
