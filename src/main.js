'use strict';

// this is where we get the command line arguments. 
// its an array, the user input arguments start at index position 2
console.log(process.argv); // eslint-disable-line 

const fs = require('fs');
const Bitmap = require('./model/index');

const testImgPath = `${__dirname}/assets/baldy.bmp`;

fs.readFile(testImgPath, (err, data) => {
  if (err) {
    throw new Error('Read file is broken! oops!');
  }
  console.log('data', data);

  const newBitmap = new Bitmap(data);
  console.log(newBitmap);
});
