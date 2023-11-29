const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
  app.post('/api/signup', (req, res) => {
    // Logic untuk membuat akun
    const fullname = req.body.fullname;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (!fullname || !username || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
    
    const query = 'INSERT INTO user_accounts(fullname, username, email, password) VALUES ($1, $2, $3, $4)';
    const values = [fullname, username, email, password];

    pool.query(query, values, (err, result) => {
      if (err) {
        console.error('Error executing query', err);
        return res.status(500).json({ error: 'Error creating account' });
      }
      res.status(201).json({
        status: 'success',
        message: 'Account created successfully!',
        user: {
          fullname: fullname,
          username: username,
          email: email
        }
      });
    });
  });

// Endpoint untuk login
  app.post('/api/login', (req, res) => {
    // Logic untuk membuat akun
    const email = req.body.email;
    const password = req.body.password;
  
    // Pastikan kedua field username dan password terisi
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }
  
    // Query ke database untuk mencocokkan username dan password
    const query = 'SELECT * FROM user_accounts WHERE email = $1 AND password = $2';
    const values = [email, password];
  
    pool.query(query, values, (err, result) => {
      if (err) {
        console.error('Error executing query', err);
        return res.status(500).json({ error: 'Error querying the database' });
      }
  
      // Jika tidak ada hasil dari query, kredensial tidak cocok
      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Jika kredensial cocok, beri respons berhasil
      res.status(200).json({
        status: 'success',
        message: 'Login successful!',
        user: {
          fullname: result.rows[0].fullname,
          username: result.rows[0].username,
          email: result.rows[0].email
        },
      });
    });
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
  

// Mulai server
  app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}`);
  });

