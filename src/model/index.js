'use strict';


const fs = require('fs');
// // size of file bitmap header = 14 bytes
// // size of DIB header = 12 bytes

// // http://en.wikipedia.org/wiki/BMP_file_format

module.exports = class Bitmap { // eslint-disable-line
  constructor(buffer) {
    const fileSizeOffset = 2;

    const dibHeaderSizeOffset = 14;
    const bitmapWidth = 18; 
    const bitmapHeight = 22;
    const colorTableLength = 1078; // eslint-disable-line
    // TODO: find which decimal number the colorTableOffset starts at
    const colorTableOffset = 68;
    this.dibHeaderSize = buffer.readUInt16LE(dibHeaderSizeOffset);
    this.width = buffer.readUInt16LE(bitmapWidth);
    this.height = buffer.readUInt16LE(bitmapHeight);
    // this.colorTable = some method from the Buffer class that passes in the 
    // colorTableOffset variable 
    // and the colorTableLength so you can just access that portion of the buffer 
    // at that offset and manipulate that data.
    this.preColorTable = buffer.slice(0, colorTableOffset);
    this.colorTable = buffer.slice(colorTableOffset, colorTableOffset + colorTableLength);
    this.postColorTable = buffer.slice(colorTableOffset + colorTableLength);
  }

  copy() {
    const newColorTable = this.colorTable;

    const newBuffer = Buffer.concat([
      this.preColorTable,
      newColorTable,
      this.postColorTable,
    ]);
    
    fs.writeFile(`${__dirname}/../assets/house_copy.bmp`, newBuffer, 'utf8', (err) => {
      if (err) return null;
      return null;
    });
  }
  // possible methods
  // greyscale()
  // invertColors()
  // fillWithBlack/Red/Green/etc
  // flipImage()
  // addBorder()
};
