const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const ssoRoutes = require('./routes/sso');
const path = require('path');

const app = express();
const PORT = 5000;

// Enable CORS for Angular dev
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Setup view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// SSO routes
app.use('/sso', ssoRoutes);

app.listen(PORT, () => {
  console.log(`SSO Server running at http://localhost:${PORT}`);
});
