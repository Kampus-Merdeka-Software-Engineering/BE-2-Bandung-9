const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { PrismaClient } = require('@prisma/client');
const signupRouter = require('./routes/signup.routes');
const loginRoutes = require('./routes/login.routes');
const appointmentRoutes = require('./routes/appointment.routes');

const app = express();
const port = process.env.PORT || 3000; // Update port to use environment variable or default to 3000

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true
}));

const prisma = new PrismaClient(); // Remove datasource definition

// Middleware untuk menyimpan status login
app.use((req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn || false;
  next();
});

// Routes
app.get('/checkLoginStatus', (req, res) => {
  res.json({ loggedIn: req.session.loggedIn || false });
});

app.use('/signup', signupRouter(prisma));
app.use('/login', loginRoutes(prisma));
app.use('/appointment', appointmentRoutes(prisma));

app.post('/logout', (req, res) => {
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
