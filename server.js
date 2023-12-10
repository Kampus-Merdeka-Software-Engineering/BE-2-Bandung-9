const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { PrismaClient } = require('@prisma/client');
const signupRouter = require('./routes/signup.routes');
const loginRoutes = require('./routes/login.routes');
const appointmentRoutes = require('./routes/appointment.routes');

const DATABASE_URL = 'postgresql://postgres:-66*d4AeG6Cd4b*2adDDdBdd-2463-ed@roundhouse.proxy.rlwy.net:28666/railway';

const app = express();
const port = 3000;
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


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
  res.json({ loggedIn: false });
});


app.use('/signup', signupRouter);
app.use('/login', loginRoutes);
app.use('/appointment', appointmentRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
