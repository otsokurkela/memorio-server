CREATE DATABASE memorio;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL UNIQUE,
    user_email TEXT NOT NULL UNIQUE,
    user_password TEXT NOT NULL
);