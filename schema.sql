---------------------
-- POSTGRES SCHEMA --
---------------------

DROP TABLE IF EXISTS reservations;
		
CREATE TABLE reservations (
  id            SERIAL PRIMARY KEY,
  restaurantId  INTEGER NULL DEFAULT NULL,
  userId        INTEGER NULL DEFAULT NULL,
  date          VARCHAR NULL DEFAULT NULL,
  time          VARCHAR NULL DEFAULT NULL,
  partySize     INTEGER NULL DEFAULT NULL,
  createdOn     VARCHAR NULL DEFAULT NULL
);


DROP TABLE IF EXISTS restaurants;
		
CREATE TABLE restaurants (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR NOT NULL,
  capacity      INTEGER NULL
);


DROP TABLE IF EXISTS users;
		
CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  username      VARCHAR NULL DEFAULT NULL,
  firstname     VARCHAR NULL DEFAULT NULL,
  lastname      VARCHAR NULL DEFAULT NULL,
  email         VARCHAR NULL DEFAULT NULL
);

ALTER TABLE reservations ADD FOREIGN KEY (restaurantId) REFERENCES restaurants (id);
ALTER TABLE reservations ADD FOREIGN KEY (userId) REFERENCES users (id);
