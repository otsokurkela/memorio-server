import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';
dotenv.config();

let localPoolConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
};

const poolConfig = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } }
  : localPoolConfig;

const pool = new Pool(poolConfig);
export default pool;
