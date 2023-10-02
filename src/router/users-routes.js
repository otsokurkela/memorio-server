import express from 'express';
import pool from '../db/db.js';
import bcrypt from 'bcrypt';
import { authenticateToken } from '../middleware/authorization.js';

const router = express.Router();

router.get('/', authenticateToken, async (request, response) => {
  try {
    const users = await pool.query('SELECT * FROM users');
    response.json({ users: users.rows });
  } catch (error) {
    response.status(500).json(error.message);
    console.error(error);
  }
});

router.post('/', async (request, response) => {
  try {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    const newUser = await pool.query(
      'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',
      [request.body.name, request.body.email, hashedPassword]
    );
    response.json({ users: newUser.rows[0] });
  } catch (error) {
    response.status(500).json(error.message);
    console.error(error);
  }
});

export default router;
