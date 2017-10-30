const path = require('path');
const expect = require('chai').expect;

const _ = require(path.join(__dirname, '..', './spec/lowbar.spec.js'));

describe('_', () => {
  'use strict';

  it('is an object', () => {
    expect(_).to.be.an('object');
  });
});