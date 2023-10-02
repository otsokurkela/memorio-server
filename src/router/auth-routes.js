import express from 'express';
import pool from './../db/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtTokens } from '../utils/jwt-helpers.js';

const router = express.Router();

router.post('/login', async (request, response) => {
  try {
    const { email, password } = request.body;
    const users = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

    if (users.rows.length === 0) return response.status(401).json({ error: 'Email is incorrect' });

    const validPassword = await bcrypt.compare(password, users.rows[0].user_password);

    if (!validPassword) return response.status(401).json({ error: 'Incorrect password' });

    let tokens = jwtTokens(users.rows[0]);
    response.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true
    });
    response.json(tokens);
  } catch (error) {
    response.status(401).json({ error: error.message });
    console.error(error);
  }
});

router.get('/refresh_token', (request, response) => {
  try {
    const refreshToken = request.cookies.refresh_token;

    if (refreshToken === null) return response.status(401).json({ error: 'Null refresh token' });
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
      if (error) return response.status(403).json({ error: error.message });

      let tokens = jwtTokens(user);

      response.cookie('refresh_token', tokens.refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true
      });
      response.json(tokens);
    });
  } catch (error) {
    response.status(401).json({ error: error.message });
    console.error(error);
  }
});

router.delete('/refresh_token', (request, response) => {
  try {
    response.clearCookie('refresh_token');
    return response.status(200).json({ message: 'refresh token deleted' });
  } catch (error) {
    response.status(401).json({ error: error.message });
  }
});
export default router;
