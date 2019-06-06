const fs = require('fs');

const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const reservationTimes = [ '6:00 PM', '6:15 PM', '6:30 PM', '6:45 PM', '7:00 PM',
  '7:15 PM', '7:30 PM', '7:45 PM', '8:00 PM', '8:15 PM', '8:30 PM', '8:45 PM', '9:00 PM'
];
const writeStream = fs.createWriteStream('data.csv', {flags: 'a'});

async function generateData() {
  const start = new Date();
  let reservationId = 0;
  writeStream.write('id,restaurantId,userId,date,time,numSeats,createdOn\n');
  for (let i = 0; i < 10000000; i += 1) {
    let count = randomNum(10, 15);
    for (let j = 0; j < count; j += 1) {
      if (!writeStream.write(`${reservationId},${i},${randomNum(1, 1000)},${'2019-06-' + ('' + randomNum(4, 30)).padStart(2, '0')},${reservationTimes[randomNum(0, 12)]},${randomNum(1, 6)},${'2019-06-' + ['04', '05', '06'][randomNum(0, 2)]}\n`)) {
        await new Promise(resolve => writeStream.once('drain', resolve));
      }
    }
  }

  writeStream.end(() => {
    let end = new Date();
    console.log(`Data generation completed in ${(end - start)/60000} minutes`)
  });
};

generateData();

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
