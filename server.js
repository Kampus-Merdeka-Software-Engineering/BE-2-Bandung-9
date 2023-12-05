const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const session = require('express-session');

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

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db_clinic',
  password: 'rizky12345',
  port: 5432,
});

pool.on('error', (err, client) => {
  console.error('Error:', err);
});

// Middleware untuk menyimpan status login
app.use((req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn || false;
  next();
});

// Routes
app.post('/api/signup', async (req, res) => {
  const { fullname, username, email, password } = req.body;

  if (!fullname || !username || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO user_accounts(fullname, username, email, password) VALUES ($1, $2, $3, $4)';
    await pool.query(query, [fullname, username, email, hashedPassword]);

    res.status(201).json({
      status: 'success',
      message: 'Account created successfully!',
      user: { fullname, username, email }
    });
  } catch (error) {
    console.error('Error creating account', error);
    res.status(500).json({ error: 'Error creating account' });
  }
});

app.get('/api/checkLoginStatus', (req, res) => {
  res.json({ loggedIn: req.session.loggedIn || false });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  try {
    const query = 'SELECT * FROM user_accounts WHERE email = $1';
    const { rows } = await pool.query(query, [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const storedPassword = rows[0].password;
    const match = await bcrypt.compare(password, storedPassword);

    if (match) {
      req.session.loggedIn = true;
      return res.status(200).json({
        status: 'success',
        message: 'Login successful!',
        user: { fullname: rows[0].fullname, username: rows[0].username, email: rows[0].email },
      });
    } else {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login', error);
    res.status(500).json({ error: 'Error during login' });
  }
});

app.get('/api/appointmentData', (req, res) => {
  pool.query('SELECT * FROM appointment', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      return res.status(500).json({ error: 'Error querying the database' });
    }
    res.json(result.rows);
  });
});

app.post('/api/appointmentForm', (req, res) => {
  const { title, name, birthdate, gender, address, phone, email, doctor, date, time } = req.body;

  if (!title || !name || !birthdate || !gender || !address || !phone || !email || !doctor || !date || !time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = 'INSERT INTO appointment(title, name, birthdate, gender, address, phone, email, doctor, date, time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
  const values = [title, name, birthdate, gender, address, phone, email, doctor, date, time];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      return res.status(500).json({ error: 'Error creating appointment' });
    }
    res.status(201).json({
      status: 'success',
      message: 'Created appointment successfully!',
      appointment: { title, name, birthdate, gender, address, phone, email, doctor, date, time }
    });
  });
});

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
