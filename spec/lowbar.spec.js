const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');

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
      expect(_.first(inputArr, 2)).to.eql([5, 4]);
    });
    it('returns the whole array if n > array length', () => {
      let inputArr = [5, 4, 3];
      expect(_.first(inputArr, 10)).to.eql([5, 4, 3]);
    });
    it('returns null for non-arrays', () => {
      expect(_.first(undefined)).to.equal(null);
    });
  });

  describe('#last', () => {
    it('is a function', () => {
      expect(_.last).to.be.a('function');
    });
    it('returns the last n values of an array', () => {
      let inputArr = [5, 4, 3];
      expect(_.last(inputArr)).to.equal(3);
      expect(_.last(inputArr, 2)).to.eql([4, 3]);
    });
    it('returns the whole array if n > array length', () => {
      let inputArr = [5, 4, 3];
      expect(_.last(inputArr, 10)).to.eql([5, 4, 3]);
    });
    it('returns null for non-arrays', () => {
      expect(_.last(undefined)).to.equal(null);
    });
  });

  //TEST CONTEXT
  describe('#each', () => {
    let testSpy = sinon.spy();
    
    it('is a function', () => {
      expect(_.each).to.be.a('function');
    });
    it('invokes the iteratee for each item in an array', () => {
      _.each([1, 2, 3, 4], testSpy);
      expect(testSpy.callCount).to.equal(4);
      expect(testSpy.args[0][2]).to.eql([1, 2, 3, 4]);
    });
    it('invokes the iteratee for each item in an object', () => {
      testSpy.reset();
      _.each({ 1: 1, 2: 2, 3: 3 }, testSpy);
      expect(testSpy.callCount).to.equal(3);
      expect(testSpy.args[0][2]).to.eql({ 1: 1, 2: 2, 3: 3 });
    });
    it('invokes the iteratee for each character in the string', () => {
      testSpy.reset();
      _.each('1234', testSpy);
      expect(testSpy.callCount).to.equal(4);
      expect(testSpy.args[0][2]).to.eql('1234');
    });
  });
});