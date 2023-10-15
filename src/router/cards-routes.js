import express from 'express';
import pool from '../db/db.js';
import { authenticateToken } from '../middleware/authorization.js';

const router = express.Router();

// Get all sets of a user
router.get('/sets', authenticateToken, async (request, response) => {
  const userId = request.user.user_id;
  const sets = await pool.query('SELECT * FROM sets WHERE set_owner = $1', [userId]);
  console.log(sets.rows);
});

export default router;
