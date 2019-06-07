---------------------
-- POSTGRES SCHEMA --
---------------------

DROP TABLE IF EXISTS reservations;
		
CREATE TABLE reservations (
  id            SERIAL PRIMARY KEY,
  restaurantId  INTEGER NOT NULL,
  userId        INTEGER NOT NULL,
  date          VARCHAR NOT NULL,
  time          VARCHAR NOT NULL,
  partySize     INTEGER NOT NULL,
  createdOn     VARCHAR NOT NULL
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
  username      VARCHAR NOT NULL,
  firstname     VARCHAR NOT NULL,
  lastname      VARCHAR NOT NULL,
  email         VARCHAR NOT NULL
);

ALTER TABLE reservations ADD FOREIGN KEY (restaurantId) REFERENCES restaurants (id);
ALTER TABLE reservations ADD FOREIGN KEY (userId) REFERENCES users (id);

copy users(id,username,firstname,lastname,email) from '/Users/gregoryinouye/Hack Reactor/reservations-gi/data/users.csv' DELIMITER ',' CSV HEADER;
copy restaurants(id,name) from '/Users/gregoryinouye/Hack Reactor/reservations-gi/data/restaurants.csv' DELIMITER ',' CSV HEADER;
-- copy reservations(id,restaurantid,userid,date,time,partySize,createdOn) from '/Users/gregoryinouye/Hack Reactor/reservations-gi/data/reservations.csv' DELIMITER ',' CSV HEADER;