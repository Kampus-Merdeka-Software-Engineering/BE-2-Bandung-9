const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const session = require('express-session')

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true
}));

// postgreSQL Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db_clinic',
    password: 'rizky12345',
    port: 5432, // Port default PostgreSQL
});

pool.on('error', (err, client) => {
    console.error('Error:', err);
});

// Routes
// Endpoint untuk membuat akun baru
app.post('/api/signup', async (req, res) => {
  // Logic untuk membuat akun
  const { fullname, username, email, password } = req.body;

  if (!fullname || !username || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO user_accounts(fullname, username, email, password) VALUES ($1, $2, $3, $4)';
    const values = [fullname, username, email, hashedPassword];

    await pool.query(query, values);

    res.status(201).json({
      status: 'success',
      message: 'Account created successfully!',
      user: {
        fullname,
        username,
        email
      }
    });
  } catch (error) {
    console.error('Error creating account', error);
    res.status(500).json({ error: 'Error creating account' });
  }
});

// Endpoint untuk login
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
      // Tandai status login dalam sesi
      req.session.loggedIn = true;
      
      return res.status(200).json({
        status: 'success',
        message: 'Login successful!',
        user: {
          fullname: rows[0].fullname,
          username: rows[0].username,
          email: rows[0].email
        },
      });
    } else {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login', error);
    res.status(500).json({ error: 'Error during login' });
  }
});
  
  // Endpoint untuk mendapatkan data dari database dari user account
  app.get('/api/data', (req, res) => {
    // Logic untuk mendapatkan data user account
    pool.query('SELECT * FROM user_accounts', (err, result) => {
      if (err) {
        console.error('Error executing query', err);
        return res.status(500).json({ error: 'Error querying the database' });
      }
      res.json(result.rows);
    });
  });
  
  // Endpoint untuk memeriksa status login
app.get('/api/checkLoginStatus', (req, res) => {
  if (req.session.loggedIn) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});
  
  // Endpoint untuk appointment
  app.post('/api/appointmentForm', (req, res) => {
    // Logic untuk medaptkan appointment
    const title = req.body.title;
    const name = req.body.name;
    const birthdate = req.body.birthdate;
    const gender = req.body.gender;
    const address = req.body.address;
    const phone = req.body.phone;
    const email = req.body.email;
    const doctor = req.body.doctor;
    const date = req.body.date;
    const time= req.body.time;

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
      message: 'created appointment successfully!',
      appointment: {
        title : title,
        name : name,
        birthdate : birthdate,
        gender : gender,
        address : address,
        phone : phone,
        email : email,
        doctor : doctor,
        date : date,
        time : time
      }
    });
  });
});

// Endpoint untuk mendapatkan data dari database dari user account
  app.get('/api/data', (req, res) => {
    // Logic untuk mendapatkan data appointment 
    pool.query('SELECT * FROM appointment', (err, result) => {
      if (err) {
        console.error('Error executing query', err);
      return res.status(500).json({ error: 'Error querying the database' });
      }
    res.json(result.rows);
    });
  });

// Endpoint untuk logout
app.post('/api/logout', (req, res) => {
  // Hapus sesi pengguna saat ini
    req.session.loggedIn = false;
    req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.status(200).json({ status: 'success', message: 'Logout successful' });
  });
});

// Mulai server
  app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}`);
  });

