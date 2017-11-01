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

  //Test context
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

  //How to test if binary search is faster than unsorted
  describe('#indexOf', () => {
    it('is a function', () => {
      expect(_.indexOf).to.be.a('function');
    });
    it('returns index of value in unsorted arr', () => {
      const arr = ['a', 'b', 'c'];
      expect(_.indexOf(arr, 'b')).to.equal(1);
      expect(_.indexOf(arr, 'c')).to.equal(2);
      expect(_.indexOf(arr, 'hi')).to.equal(-1);
    });
    it('returns index via binary search of value a sorted arr', () => {
      const arr = [1, 2, 3, 4, 5];
      expect(_.indexOf(arr, 2)).to.equal(1);
      expect(_.indexOf(arr, 5)).to.equal(4);
      expect(_.indexOf(arr, 'hi')).to.equal(-1);
    });
  });

  //Test context
  describe('#filter', () => {
    it('is a function', () => {
      expect(_.filter).to.be.a('function');
    });
    it('passes every list item to the predicate', () => {
      const arr = [0, 1, 2, 3, 4, 5];
      let testSpy = sinon.spy();
      _.filter(arr, testSpy);
      expect(testSpy.callCount).to.equal(arr.length);
      expect(testSpy.args[0][2]).to.eql(arr);
    });
    it('only returns list items that pass the predicate test', () => {
      let arr = [0, 1, 2, 3, 4, 5];
      let predicate = (num) => num > 2;
      expect(_.filter(arr, predicate)).to.eql([3, 4, 5]);

      arr = ['a', 'b', 'c'];
      predicate = (char) => char === 'b';
      expect(_.filter(arr, predicate)).to.eql(['b']);
      predicate = (char) => char === 'hi';
      expect(_.filter(arr, predicate)).to.eql([]);
    });
  });

  describe('#reject', () => {
    it('is a function', () => {
      expect(_.reject).to.be.a('function');
    });
    it('passes every list item to the predicate', () => {
      const arr = [0, 1, 2, 3, 4, 5];
      let testSpy = sinon.spy();
      _.reject(arr, testSpy);
      expect(testSpy.callCount).to.equal(arr.length);
      expect(testSpy.args[0][2]).to.eql(arr);
    });
    it('should return a list of items that fail the predicate test', () => {
      let arr = [0, 1, 2, 3, 4, 5];
      let predicate = (num) => num > 2;
      expect(_.reject(arr, predicate)).to.eql([0, 1, 2]);

      arr = ['a', 'b', 'c'];
      predicate = (char) => char === 'b';
      expect(_.reject(arr, predicate)).to.eql(['a', 'c']);
      predicate = (char) => char === 'hi';
      expect(_.reject(arr, predicate)).to.eql(arr);
    });
  });

  describe('#uniq', () => {
    it('is a function', () => {
      expect(_.uniq).to.be.a('function');
    });
    it('removes duplicate entries from array', () => {
      const testArr = [1, '2', 1, 'three'];
      expect(_.uniq(testArr)).to.eql([1, '2', 'three']);
    });
    it('yeilds each unique item to an interatee', () => {
      const testArr = [1, 2, 3, 2, 3];
      const iteratee = (num) => num * 10;
      expect(_.uniq(testArr, false, iteratee)).to.eql([10, 20, 30]);
    });
    xit('filters array via faster binary search', () => {
      const testArr = [1, 2, 2, 2, 3, 3];
      expect(_.uniq(testArr, true)).to.eql([1, 2, 3]);
    });
  });
});