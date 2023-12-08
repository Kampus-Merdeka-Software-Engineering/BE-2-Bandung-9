const express = require('express');
const bcrypt = require('bcrypt');

function signupRouter(prisma) {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const { fullname, username, email, password } = req.body;

    // Validasi input
    if (!fullname || !username || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user_accounts.create({
        data: {
          fullname,
          username,
          email,
          password: hashedPassword,
        },
      });

      res.status(201).json({
        status: 'success',
        message: 'Account created successfully!',
        user: { fullname, username, email },
      });
    } catch (error) {
      console.error('Error creating account', error);
      res.status(500).json({ error: 'Error creating account' });
    }
  });

  return router;
}

module.exports = signupRouter;
