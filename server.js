const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { PrismaClient } = require('@prisma/client');
const signupRouter = require('./routes/signup.routes');
const loginRoutes = require('./routes/login.routes');
const appointmentRoutes = require('./routes/appointment.routes');
require('dotenv').config(); // Memanggil fungsi config dari dotenv

const { PORT, DATABASE_URL } = process.env;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true
}));

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
});

app.use((req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn || false;
  next();
});

app.get('/api/checkLoginStatus', (req, res) => {
  res.json({ loggedIn: req.session.loggedIn || false });
});

app.use('/signup', signupRouter);
app.use('/login', loginRoutes);
app.use('/appointment', appointmentRoutes);

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.status(200).json({ status: 'success', message: 'Logout successful' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
