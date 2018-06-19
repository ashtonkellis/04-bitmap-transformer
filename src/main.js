'use strict';

// this is where we get the command line arguments. 
// its an array, the user input arguments start at index position 2
// console.log(process.argv); // eslint-disable-line 

const fs = require('fs');
const Bitmap = require('./model/index');

const testImgPath = `${__dirname}/assets/bitmap.bmp`;

fs.readFile(testImgPath, (err, data) => {
  if (err) {
    throw new Error('Read file is broken! oops!');
  }
  
  const newBitmap = new Bitmap(data);
  // height should be 55,138 bytes
  // width shoudl be 110
  // height should be 125
  console.log('dib header size:', newBitmap.dibHeaderSize);
  console.log('    width:', newBitmap.width); 
  console.log('   height:', newBitmap.height);
  newBitmap.copy();
  newBitmap.toBlack();
});
