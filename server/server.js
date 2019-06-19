require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
// const redis = require('redis');

// const client = redis.createClient();
const db = require('../db/db.js');
// const Availability = require('../db/db.js');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/:id', (req, res) => {
  if (!req.params.id) {
    res.status(400);
    res.end();
  } else {
    res.sendFile('index.html', { root: path.resolve(__dirname, '../public') });
  }
});

// const getCache = (req, res) => {
//   const resID = Number(req.params.id);
//   client.get(resID, (err, result) => {
//     if (result) {
//       res.status(200).send(result);
//     } else {
//       const queryText = 'SELECT reservations.id, restaurants.name, restaurants.capacity, reservations.date, reservations.time, reservations.partysize, reservations.createdon FROM restaurants, reservations WHERE reservations.restaurantid = $1 AND restaurants.id = $1';
      
//       // SEQUELIZE query for original FEC project
//       // Availability.findOne({ where: { id: resID } })
//       //   .then((main) => {
//       //     res.status(200).send(main);
//       //   })
//       //   .catch((err) => {
//       //     res.status(404).send('unable to retrieve from db: ', err);
//       //   });

//       // POSTGRES query for SDC project
//       db.query(queryText, [resID], (err, data) => {
//         if (err) {
//           console.log(err.stack);
//           res.status(404).send(`unable to retrieve from db: ${err}`);
//         } else {
//           client.setex(resID, 3600, JSON.stringify(data.rows));
//           res.status(200).send(data.rows);
//         }
//       });
//     }
//   });
// };

app.get('/:id/reservations', (req, res) => {
  const resID = Number(req.params.id);
  const queryText = 'SELECT reservations.id, restaurants.name, restaurants.capacity, reservations.date, reservations.time, reservations.partysize, reservations.createdon FROM restaurants, reservations WHERE reservations.restaurantid = $1 AND restaurants.id = $1';
  db.query(queryText, [resID], (err, data) => {
    if (err) {
      console.log(err.stack);
      res.status(404).send(`Unable to retrieve from db: ${err}`);
    } else {
      res.status(200).send(data.rows);
    }
  });
});

app.post('/:id/reservations', (req, res) => {
  const queryText = 'INSERT INTO reservations(restaurantId, userId, date, time, partySize, createdOn) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
  const restaurantid = req.params.id;
  const { userId, date, time, partySize, createdOn } = req.body;
  const values = [ restaurantid, userId, date, time, partySize, createdOn ];
  db.query(queryText, values, (err, data) => {
    if (err) {
      console.log(err.stack, userId);
      res.status(404).send(`unable to POST reservation: ${err}`);
    } else {
      res.status(200).send({ reservationId: data.rows[0].id });
    }
  });
});

app.put('/:id/reservations/:reservationId', (req, res) => {
  const queryText = 'UPDATE reservations SET date = $1, time = $2, partySize = $3 WHERE id = $4';
  const id = req.params.reservationId;
  const { date, time, partySize } = req.body;
  const values = [ date, time, partySize, id ];
  db.query(queryText, values, (err, data) => {
    if (err) {
      console.log(err.stack);
      res.status(404).send(`unable to PUT reservation: ${err}`);
    } else if (data.rowCount === 0) {
      res.status(404).send('unable to PUT reservation');
    } else {
      res.status(200).send({ id, date, time, partySize });
    }
  });
});

app.delete('/:id/reservations/:reservationId', (req, res) => {
  const queryText = 'DELETE FROM reservations WHERE id = $1';
  const values = [ req.params.reservationId ];
  db.query(queryText, values, (err, data) => {
    if (err) {
      console.log(err.stack);
      res.status(404).send(`unable to DELETE reservation: ${err}`);
    } else if (data.rowCount === 0) {
      res.status(404).send(`unable to DELETE reservation: ${req.params.reservationId}`);
    } else {
      res.status(200).send({ reservationId: req.params.reservationId });
    }
  });
});

module.exports = app;
