-- DROP KEYSPACE IF EXISTS reservations;

-- CREATE KEYSPACE reservations
--   WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 3};

USE reservations;

-- DROP TABLE IF EXISTS reservations.reservations_by_restaurant;

CREATE TABLE reservations.reservations_by_restaurant (
  restaurantId INT,
  reservationid INT,
  restaurantName TEXT,
  restaurantCapacity INT,
  userId INT,
  username TEXT,
  firstname TEXT,
  lastname TEXT,
  email TEXT,
  date TEXT,
  time TEXT,
  partySize INT,
  createdOn TEXT,
  PRIMARY KEY((restaurantId), reservationId, date)
) WITH comment = 'Q1. Find all reservations at a given restaurant'
AND CLUSTERING ORDER BY (reservationId ASC, date ASC);

-- DROP TABLE IF EXISTS reservations.reservations_by_reservation;

CREATE TABLE reservations.reservations_by_reservation (
  restaurantId INT,
  reservationid INT,
  restaurantName TEXT,
  restaurantCapacity INT,
  userId INT,
  username TEXT,
  firstname TEXT,
  lastname TEXT,
  email TEXT,
  date TEXT,
  time TEXT,
  partySize INT,
  createdOn TEXT,
  PRIMARY KEY((restaurantId), reservationId, date)
) WITH comment = 'Q1. Find all reservations at a given restaurant'
AND CLUSTERING ORDER BY (date ASC);

-- DROP TABLE IF EXISTS reservations.reservations_by_user;

CREATE TABLE reservations.reservations_by_user (
  userId INT,
  username TEXT,
  firstname TEXT,
  lastname TEXT,
  email TEXT,
  restaurantId INT,
  reservationid INT,
  restaurantName TEXT,
  restaurantCapacity INT,
  date TEXT,
  time TEXT,
  partySize INT,
  createdOn TEXT,
  PRIMARY KEY((userId), createdOn)
) WITH comment = 'Q2. Find all reservations for a given user'
AND CLUSTERING ORDER BY (createdOn ASC);

COPY reservations.reservations_by_restaurant(
  restaurantId,reservationId,restaurantName,restaurantCapacity,userId,username,firstname,lastname,email,date,time,partySize,createdOn
  ) from '/Users/gregoryinouye/Hack Reactor/SDC nullTable/reservations-gi/data/cassandraReservationsByReservations.csv' WITH HEADER = TRUE AND NUMPROCESSES=16;

COPY reservations.reservations_by_reservation(
  restaurantId,reservationId,restaurantName,restaurantCapacity,userId,username,firstname,lastname,email,date,time,partySize,createdOn
  ) from '/Users/gregoryinouye/Hack Reactor/SDC nullTable/reservations-gi/data/cassandraReservationsByReservations.csv' WITH HEADER = TRUE AND NUMPROCESSES=16;

COPY reservations.reservations_by_user(
  restaurantId,reservationId,restaurantName,restaurantCapacity,userId,username,firstname,lastname,email,date,time,partySize,createdOn
  ) from '/Users/gregoryinouye/Hack Reactor/SDC nullTable/reservations-gi/data/cassandraReservationsByReservations.csv' WITH HEADER = TRUE AND NUMPROCESSES=16;
