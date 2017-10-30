const path = require('path');
const expect = require('chai').expect;

const _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('_', () => {
  'use strict';

  it('is an object', () => {
    expect(_).to.be.an('object');
  });

  describe('#identity', () => {
    it('is a function', function () {
      expect(_.identity).to.be.a('function');
    });

    it('returns the argument that was passed to it', () => {
      const value = 'foo';
      expect(_.identity(value)).to.eql(value);
    });
  });

  describe('#values', () => {
    it('is a function', () => {
      expect(_.values).to.be.a('function');
    });
    it('returns the values of an object', () => {
      let inputObj = { one: 10, two: 'hello', three: true };
      expect(_.values(inputObj)).to.eql([10, 'hello', true]);
    });
    it('returns the values of an array', () => {
      let inputObj = ['h', [1], [1, 2, 3]];
      expect(_.values(inputObj)).to.eql(['h', [1], [1, 2, 3]]);
    });
    it('returns null for non-objects', () => {
      expect(_.values(true)).to.equal(null);
      expect(_.values()).to.equal(null);
    });
  });

  describe('#first', () => {
    it('is a function', () => {
      expect(_.first).to.be.a('function');
    });
    it('returns the first n values of an array', () => {
      let inputArr = [5, 4, 3];
      expect(_.first(inputArr)).to.equal(5);
    });
    it('returns null for non-arrays', () => {
      expect(_.first(undefined)).to.equal(null);
    });
  });
});