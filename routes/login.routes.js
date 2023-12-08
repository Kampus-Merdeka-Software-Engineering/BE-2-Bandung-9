const express = require('express');
const loginRoutes = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

loginRoutes.post('/', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  try {
    const user = await prisma.user_accounts.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      req.session.loggedIn = true;
      return res.status(200).json({
        status: 'success',
        message: 'Login successful!',
        user: { fullname: user.fullname, username: user.username, email: user.email },
      });
    } else {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login', error);
    res.status(500).json({ error: 'Error during login' });
  }
});

module.exports = loginRoutes;

