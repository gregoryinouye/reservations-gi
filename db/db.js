// const Sequelize = require('sequelize');
const { Pool } = require('pg');

const pool = new Pool({
  user: '',
  host: 'localhost',
  database: 'opentable',
  password: '',
  port: 5432,
});

// client.connect((err) => {
//   if (err) {
//     console.error('Unable to connect to the database:', err);
//   } else {
//     console.log('PostgreSQL db connection has been established successfully.');
//   }
// });

// SEQUELIZE DATABASE CONNECTION FOR FEC PROJECT
// change user: 'root' and password: 'password' with your credentials
// const sequelize = new Sequelize('reservations', 'root', 'password', {
//   host: 'localhost',
//   dialect: 'mysql',
//   logging: false,
// });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('db connection has been established successfully.');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

// const Availability = sequelize.define('restaurant',
//   {
//     name: {
//       type: Sequelize.STRING,
//     },
//     booked: {
//       type: Sequelize.INTEGER,
//     },
//     '6:00 PM': {
//       type: Sequelize.INTEGER,
//     },
//     '6:15 PM': {
//       type: Sequelize.INTEGER,
//     },
//     '6:30 PM': {
//       type: Sequelize.INTEGER,
//     },
//     '6:45 PM': {
//       type: Sequelize.INTEGER,
//     },
//     '7:00 PM': {
//       type: Sequelize.INTEGER,
//     },
//     '7:15 PM': {
//       type: Sequelize.INTEGER,
//     },
//     '7:30 PM': {
//       type: Sequelize.INTEGER,
//     },
//     '7:45 PM': {
//       type: Sequelize.INTEGER,
//     },
//     '8:00 PM': {
//       type: Sequelize.INTEGER,
//     },
//     '8:15 PM': {
//       type: Sequelize.INTEGER,
//     },
//     '8:30 PM': {
//       type: Sequelize.INTEGER,
//     },
//   },
//   {
//     timestamps: false,
//   });
// 
// module.exports = Availability;

module.exports = pool;
