DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    imageurl VARCHAR,
    bio VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS password_reset_codes;

CREATE TABLE password_reset_codes(
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL,
  code VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS friendships;

CREATE TABLE friendships(
  id SERIAL PRIMARY KEY,
  senderid INT NOT NULL REFERENCES users(id),
  receiverid INT NOT NULL REFERENCES users(id),
  accepted BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS chat;

CREATE TABLE chat (
  id SERIAL PRIMARY KEY,
  message TEXT NOT NULL,
  sender_id INT NOT NULL REFERENCES tblusers(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO chat (message, sender_id)
VALUES 
("Hello", 1),
("Hello to you too", 2),
("Hello again", 2);

