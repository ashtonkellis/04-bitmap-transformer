'use strict';

const fake = require('./../lib/fake');

describe('testing fake function', () => {
  test('fake function', () => {
    expect(fake()).toBe('working');
  });
});
