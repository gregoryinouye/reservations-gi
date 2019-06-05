const fs = require('fs');

const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const reservationTimes = [ '6:00 PM', '6:15 PM', '6:30 PM', '6:45 PM', '7:00 PM',
  '7:15 PM', '7:30 PM', '7:45 PM', '8:00 PM', '8:15 PM', '8:30 PM', '8:45 PM', '9:00 PM'
];
let counter = 1;

const generateData = () => {
  const writeStream = fs.createWriteStream('data.csv', {flags: 'a'});
  writeStream.write('id,reservationId,userId,date,time,numSeats\n')
  for (let i = 0; i < 1000000; i += 1) {
    let count = randomNum(10, 15);
    for (let j = 0; j < count; j += 1) {
      writeStream.write(`${i},${j},${randomNum(1, 1000)},${'2019-06-' + ('' + randomNum(4, 30)).padStart(2, '0')},${reservationTimes[randomNum(0, 12)]},${randomNum(1, 6)}\n`);
    }
  }
  console.log(`Data part ${counter} generated`);
  writeStream.end();
  writeStream.on('finish', () => {
    if (counter < 10) {
      counter++;
      console.log(`Starting next batch ${counter} of 10`)
      generateData();
    } else {
      console.log('Data generation completed');
    }
  });
};

generateData();
