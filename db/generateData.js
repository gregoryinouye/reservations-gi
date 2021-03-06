const fs = require('fs');
const faker = require('faker');

const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const reservationTimes = [ '6:00 PM', '6:15 PM', '6:30 PM', '6:45 PM', '7:00 PM',
  '7:15 PM', '7:30 PM', '7:45 PM', '8:00 PM', '8:15 PM', '8:30 PM', '8:45 PM', '9:00 PM'
];

async function generateReservationData() {
  const writeStream = fs.createWriteStream('data.csv', {flags: 'a'});
  const start = new Date();
  let reservationId = 0;
  writeStream.write('id,restaurantId,userId,date,time,partySize,createdOn\n');
  for (let i = 1; i <= 10000000; i += 1) {
    let count = randomNum(10, 15);
    for (let j = 0; j < count; j += 1) {
      reservationId += 1;
      if (!writeStream.write(`${reservationId},${i},${randomNum(1, 1000)},${'2019-06-' + ('' + randomNum(4, 30)).padStart(2, '0')},${reservationTimes[randomNum(0, 12)]},${randomNum(1, 6)},${'2019-06-' + ['04', '05', '06'][randomNum(0, 2)]}\n`)) {
        await new Promise(resolve => writeStream.once('drain', resolve));
      }
    }
  }

  writeStream.end(() => {
    let end = new Date();
    console.log(`Reservation data generation completed in ${(end - start)/60000} minutes`)
  });
};

// generateReservationData();

async function generateUserData() {
  const start = new Date();
  const writeUserStream = fs.createWriteStream('userData.csv', {flags: 'a'});
  writeUserStream.write('id,username,firstname,lastname,email\n');
  for (let i = 1; i <= 10000; i += 1) {
    if (!writeUserStream.write(`${i},${faker.internet.userName()},${faker.name.firstName()},${faker.name.lastName()},${faker.internet.email()}\n`)) {
      await new Promise(resolve => writeUserStream.once('drain', resolve));
    }
  }

  writeUserStream.end(() => {
    let end = new Date();
    console.log(`User data generation completed in ${(end - start)/60000} minutes`)
  });
};

// generateUserData();

async function generateRestaurantData() {
  const start = new Date();
  const names = [];
  for (let i = 1; i <= 1000; i++) {
    names.push(faker.lorem.word());
  }
  const writeRestaurantStream = fs.createWriteStream('restaurantData.csv', {flags: 'a'});
  writeRestaurantStream.write('id,restaurant,capacity\n');
  for (let i = 0; i < 10000000; i += 1) {
    if (!writeRestaurantStream.write(`${i},${names[randomNum(0, 999)]},${randomNum(8, 24)}\n`)) {
      await new Promise(resolve => writeRestaurantStream.once('drain', resolve));
    }
  }

  writeRestaurantStream.end(() => {
    let end = new Date();
    console.log(`Restaurant data generation completed in ${(end - start)/60000} minutes`)
  });
};

// generateRestaurantData();

async function generateCassandraReservationsByReservationsData() {
  const writeStream = fs.createWriteStream('cassandraReservationsByReservations.csv', {flags: 'a'});
  const start = new Date();
  const users = [];
  for (let i = 1; i <= 10000; i += 1) {
    users.push(`${i},${faker.internet.userName()},${faker.name.firstName()},${faker.name.lastName()},${faker.internet.email()}`);
  }
  let reservationId = 0;
  writeStream.write('restaurantId,reservationId,restaurantName,restaurantCapacity,userId,username,firstname,lastname,email,date,time,partySize,createdOn\n');
  for (let i = 1; i <= 10000000; i += 1) {
    let count = randomNum(10, 15);
    for (let j = 0; j < count; j += 1) {
      reservationId += 1;
      if (!writeStream.write(`${i},${reservationId},${faker.lorem.word()},${randomNum(8,24)},${users[randomNum(0,9999)]},${'2019-06-' + ('' + randomNum(4, 30)).padStart(2, '0')},${reservationTimes[randomNum(0, 12)]},${randomNum(1, 6)},${'2019-06-' + ['04', '05', '06'][randomNum(0, 2)]}\n`)) {
        await new Promise(resolve => writeStream.once('drain', resolve));
      }
    }
  }

  writeStream.end(() => {
    let end = new Date();
    console.log(`Cassandra reservation data generation completed in ${(end - start)/60000} minutes`)
  });
};

generateCassandraReservationsByReservationsData();

// GENERATE DATA WITH CALLBACKS VERSION

// const fs = require('fs');

// const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
// const reservationTimes = [ '6:00 PM', '6:15 PM', '6:30 PM', '6:45 PM', '7:00 PM',
//   '7:15 PM', '7:30 PM', '7:45 PM', '8:00 PM', '8:15 PM', '8:30 PM', '8:45 PM', '9:00 PM'
// ];
// let counter = 1;

// const generateData = () => {
//   const writeStream = fs.createWriteStream('data.csv', {flags: 'a'});
//   writeStream.write('id,reservationId,userId,date,time,numSeats\n')
//   for (let i = 0; i < 1000000; i += 1) {
//     let count = randomNum(10, 15);
//     for (let j = 0; j < count; j += 1) {
//       writeStream.write(`${i},${j},${randomNum(1, 1000)},${'2019-06-' + ('' + randomNum(4, 30)).padStart(2, '0')},${reservationTimes[randomNum(0, 12)]},${randomNum(1, 6)}\n`);
//     }
//   }
//   console.log(`Data part ${counter} generated`);
//   writeStream.end();
//   writeStream.on('finish', () => {
//     if (counter < 10) {
//       counter++;
//       console.log(`Starting next batch ${counter} of 10`)
//       generateData();
//     } else {
//       let end = Date.now();
//       console.log(`Data generation completed in ${(end - start)/60000} minutes`);
//     }
//   });
// };

// let start = Date.now();
// generateData();
