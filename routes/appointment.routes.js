const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function appointmentRoutes(prisma) {
  const router = express.Router();
// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany();
    res.json(appointments);
  } catch (error) {
    console.error('Error querying appointments', error);
    res.status(500).json({ error: 'Error querying appointments' });
  }
});

// Create a new appointment
router.post('/', async (req, res) => {
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

return router;
}

module.exports = appointmentRoutes;
