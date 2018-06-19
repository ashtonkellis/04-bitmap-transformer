'use strict';

const fs = require('fs');

function logColorTable(colorTable, strng) {
  for (let i = 0; i < colorTable.length; i += 4) {
    console.log(strng, Math.floor((i / 4) + 1), colorTable.slice(i, i + 4));
  }
}

module.exports = class Bitmap { // eslint-disable-line
  constructor(buffer) {
    const dibHeaderSizeOffset = 14;
    const bitmapWidth = 18; 
    const bitmapHeight = 22;
    const colorTableLength = 1078;

    const dibHeaderSize = buffer.readUInt16LE(dibHeaderSizeOffset);
    const colorTableOffset = dibHeaderSizeOffset + dibHeaderSize;

    this.width = buffer.readUInt16LE(bitmapWidth);
    this.height = buffer.readUInt16LE(bitmapHeight);

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

  toBlack() {
    const newColorTable = this.colorTable;

    logColorTable(newColorTable, 'before:');

    for (let i = 0; i < newColorTable.length; i++) {
      newColorTable[i] = 0;
    }

    logColorTable(newColorTable, 'after:');

    const newBuffer = Buffer.concat([
      this.preColorTable,
      newColorTable,
      this.postColorTable,
    ]);
    
    fs.writeFile(`${__dirname}/../assets/house_black.bmp`, newBuffer, 'utf8', (err) => {
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
