import express from 'express';
import pool from './../db/db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/', async (request, response) => {
  try {
    const users = await pool.query('SELECT * FROM users;');
    response.json(users.rows);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

export default router;
