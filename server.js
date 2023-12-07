const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { PrismaClient } = require('@prisma/client');
const signupRouter = require('./routes/signup.routes');
const loginRoutes = require('./routes/login.routes');
const appointmentRoutes = require('./routes/appointment.routes');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true
}));

const prisma = new PrismaClient();

// Middleware untuk menyimpan status login
app.use((req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn || false;
  next();
});

// Routes (misalnya: /api/signup, /api/login, /api/appointmentData, dll.)

// Gunakan routes yang telah diperbaiki, seperti signup.routes.js, login.routes.js, appointment.routes.js
app.get('/api/checkLoginStatus', (req, res) => {
  res.json({ loggedIn: req.session.loggedIn || false });
});

app.use('/api/signup', signupRouter);
app.use('/api/login', loginRoutes);
app.use('/api/appointment', appointmentRoutes);

app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.status(200).json({ status: 'success', message: 'Logout successful' });
  });
});

app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});
