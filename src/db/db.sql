CREATE DATABASE memorio;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL UNIQUE,
    user_email TEXT NOT NULL UNIQUE,
    user_password TEXT NOT NULL
);

CREATE TABLE sets (
    set_id SERIAL PRIMARY KEY,
    set_name TEXT NOT NULL,
    set_description TEXT,
    set_date DATE NOT NULL, /* in form 1992-02-02 */
    set_owner SERIAL NOT NULL /* owner id */
);

CREATE TABLE flashcards (
    card_id SERIAL PRIMARY KEY,
    card_key TEXT NOT NULL,
    card_description TEXT NOT NULL,
    card_date DATE NOT NULL,
    card_set SERIAL NOT NULL /* id of the card's set */
);
 /*
INSERT INTO flashcards (card_key, card_description, card_date, card_set) VALUES ('testi2', 'vastaus2', '2023-10-15', 1);
INSERT INTO flashcards (card_key, card_description, card_date, card_set) VALUES ('testi3', 'vastaus3', '2023-10-15', 2);
INSERT INTO flashcards (card_key, card_description, card_date, card_set) VALUES ('testi4', 'vastaus4', '2023-10-15', 2);
*/