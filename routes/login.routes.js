const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:-66*d4AeG6Cd4b*2adDDdBdd-2463-ed@roundhouse.proxy.rlwy.net:28666/railway',
    },
  },
});

const loginRoutes = express.Router();

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
