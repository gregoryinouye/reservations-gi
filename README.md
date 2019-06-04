# nullTable

> A user can search for a restaurant based on location, cuisine, or restaurant’s name and visit the restaurant’s page to get an overview of what the restaurant has to offer like photos of their dishes, their menu options, customers’ reviews, and be able to make a reservation.

## Related Projects

  - Reservation: https://github.com/freeseats/wfong-service-reservations
  - Top-Bar: https://github.com/freeseats/exzerone-search-bar
  - Menu, Related Restaurants, Side-Bar: https://github.com/freeseats/Menu-Related-SideBar
  - Restaurant Photos: https://github.com/freeseats/matthewjdiaz1-photo-service
  - Reviews: https://github.com/freeseats/slhodak-reviews-and-impressions

## Table of Contents

1. [Requirements](#requirements)
1. [Development](#development)
1. [Usage](#Usage)

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Seeding Database
- Before seeding, make sure to npm install
- Log into mySQL from terminal: mySQL -u root -p
- Enter password if set up with one
- If 'reservations' database exists in mySQL: drop database reservations;
- Create database in mySQL: create database reservations;
- Select database: use reservations;
- Go to db/db.js to change your user and password on line 4
- Run script:
npm run seed
- To check 'reservations' database: select * from restaurants;

## Usage

From within the root directory:
```sh
npm install
npm run build
npm start
```
- Point browser to: localhost:3020

## CRUD API

- GET (/:id/reservations)

  Gets all reservations for the restaurant with specified id.

  ```javascript
  [
    {
      id: 6,
      username: 'btrent',
      time: '6:00 PM',
      numSeats: 3,
    },
    {
      id: 7,
      username: 'jmayo',
      time: '6:15 PM',
      numSeats: 4,
    }
  ]
  ```

- POST (/:id/reservations)
  
  Creates a new reservation for the restaurant with given id. The request must be sent with username, time, numSeats in req.body.

  ```javascript
  {
    username: 'jdoe',
    time: '6:30 PM',
    numSeats: 3,
  }
  ```

  When the creation is successful, the HTTP response is a 201 Created and the response contains the reservation id for the new reservation:

  ```javascript
  { reservationId: 2 }
  ```

- PUT (/:id/reservations/:reservationId)
  
  Updates the reservation with specified reservationId. The request must be sent with id, time, seat number in req.body.

  ```javascript
  {
    id: 1,
    user: 2,
    time: '7:00 PM',
    numSeats: 4,
  }
  ```
  
  When the update is successful, the HTTP response is a 200 OK and the header contains the updated reservation information.

    ```javascript
  {
    id: 29,
    username: 'vtran',
    time: '7:30 PM',
    numSeats: 3,
  }
  ```

- DELETE (/:id/reservations/:reservationId)
  
  Deletes a reservation with specified reservationId at restaurant with specified id.

  When the delete is successful, the HTTP response is a 200 OK and the header contains the deleted reservation information.

  ```javascript
  { reservationId: 47 }
  ```