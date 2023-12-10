const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const signupRouter = require('./routes/signup.routes');
const loginRoutes = require('./routes/login.routes');
const appointmentRoutes = require('./routes/appointment.routes');


const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("respon");
});

app.use('/signup', signupRouter);
app.use('/login', loginRoutes);
app.use('/appointment', appointmentRoutes);

app.post('/logout', (req, res) => {
    if (err) {
      console.error('Error :', err);
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.status(200).json({ status: 'success', message: 'Logout successful' });
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
