const express = require('express');
const { PrismaClient } = require('@prisma/client');
const DATABASE_URL = 'postgresql://postgres:-66*d4AeG6Cd4b*2adDDdBdd-2463-ed@roundhouse.proxy.rlwy.net:28666/railway';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
});

const appointmentRoutes = express.Router();

// Get all appointments
appointmentRoutes.get('/', async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany();
    res.json(appointments);
  } catch (error) {
    console.error('Error querying appointments', error);
    res.status(500).json({ error: 'Error querying appointments' });
  }
});

// Create a new appointment
appointmentRoutes.post('/', async (req, res) => {
  const { title, name, birthdate, gender, address, phone, email, doctor, date, time } = req.body;

  if (!title || !name || !birthdate || !gender || !address || !phone || !email || !doctor || !date || !time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newAppointment = await prisma.appointment.create({
      data: {
        title,
        name,
        birthdate,
        gender,
        address,
        phone,
        email,
        doctor,
        date,
        time,
      },
    });

    res.status(201).json({
      status: 'success',
      message: 'Created appointment successfully!',
      appointment: newAppointment,
    });
  } catch (error) {
    console.error('Error creating appointment', error);
    res.status(500).json({ error: 'Error creating appointment' });
  }
});

module.exports = appointmentRoutes;
