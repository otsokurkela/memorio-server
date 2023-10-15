import express from 'express';
import pool from '../db/db.js';
import { authenticateToken } from '../middleware/authorization.js';

const router = express.Router();

// Get all sets of a user
router.get('/sets', authenticateToken, async (request, response) => {
  const userId = request.user.user_id;
  const sets = await pool.query('SELECT * FROM sets WHERE set_owner = $1', [userId]);
  const cards = await pool.query('SELECT * FROM flashcards WHERE card_owner = $1', [userId]);
  const cardsets = sets.rows.map((set, i) => {
    return {
      set_id: set.set_id,
      set_name: set.set_name,
      set_description: set.set_description,
      set_date: set.set_date,
      set_owner: set.set_owner,
      set_cards: cards.rows.filter((card) => card.card_set == set.set_id)
    };
  });
  response.json(cardsets).status(200);
});

export default router;
