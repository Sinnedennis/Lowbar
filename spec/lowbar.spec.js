const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');

let _;

if (process.env.underscore === 'true') {
  _ = require('underscore');
} else {
  _ = require(path.join(__dirname, '..', './lowbar.js'));
}

describe('_', () => {
  'use strict';

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
      expect(_.indexOf(arr, 'c', false)).to.equal(2);
      expect(_.indexOf(arr, 'hi', false)).to.equal(-1);
    });
    xit('returns index via binary search of value a sorted arr', () => {
      const arr = [1, 2, 3, 4, 5];
      expect(_.indexOf(arr, 2, true)).to.equal(1);
      expect(_.indexOf(arr, 5, true)).to.equal(4);
      expect(_.indexOf(arr, 'hi', true)).to.equal(-1);
    });
    it('starts searching at i if given number as third argument', () => {
      const arr = [1, 2, 3, 4, 5];
      expect(_.indexOf(arr, 2, 2)).to.equal(-1);
      expect(_.indexOf(arr, 5, 1)).to.equal(4);
      expect(_.indexOf(arr, 4, 1)).to.equal(3);
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
  describe('#map', () => {
    it('is a function', () => {
      expect(_.map).to.be.a('function');
    });
    it('yields each item to the iteratee', () => {
      const arr = [1, 2, 3];
      let count = 0;

      const result = _.map(arr, (item) => {
        count++;
        return item * 10;
      });

      expect(result).to.eql([10, 20, 30]);
      expect(count).to.equal(arr.length);
      expect(arr).to.eql([1, 2, 3]);
    });
  });

  describe('#contains', () => {
    it('is a function', () => {
      expect(_.contains).to.be.a('function');
    });
    it('returns true if value is present in list', () => {
      const list = [1, 2, 3, 4];
      expect(_.contains(list, 1)).to.be.true;
      expect(_.contains(list, 4)).to.be.true;
      expect(_.contains(list, 2, 0)).to.be.true;
    });
    it('returns false if value is not present in list', () => {
      const list = [1, 2, 3, 4];
      expect(_.contains(list, 'foo')).to.be.false;
      expect(_.contains(list, '2')).to.be.false;
      expect(_.contains(list, true, 0)).to.be.false;
    });
    it('starts searching from given index', () => {
      const list = [1, 2, 3, 4];
      expect(_.contains(list, 1, 2)).to.be.false;
      expect(_.contains(list, 1, 1)).to.be.false;
      expect(_.contains(list, 1, 0)).to.be.true;
    });
  });

  describe('#pluck', () => {
    it('should be a function', () => {
      expect(_.pluck).to.be.a('function');
    });
    it('should extract a value from an array of objects', () => {
      const arr = [
        { name: 'moe', age: 40 },
        { name: 'larry', age: 50 },
        { name: 'curly', age: 60 }
      ];

      expect(_.pluck(arr, 'name')).to.eql(['moe', 'larry', 'curly']);
      expect(_.pluck(arr, 'age')).to.eql([40, 50, 60]);
    });
    it('returns undefined when value is not present in object', () => {
      const arr = [
        {foo: 'bar'},
        {foo: 'bar'}
      ];

      expect(_.pluck(arr, 'banana')).to.eql([undefined, undefined]);
    });
  });

  describe('#reduce', () => {
    it('should be a function', () => {
      expect(_.reduce).to.be.a('function');
    });
    it('should reduce a list of values down to a single value', () => {
      const arr = [5, 5, 5, 5];
      const iteratee = (memo, num) => memo + num;
      expect(_.reduce(arr, iteratee, 0)).to.equal(20);
    });
    it('uses the first list item as the memo if memo is not supplied', () => {
      const arr = [5, 5, 5, 5];
      const iteratee = (memo, num) => memo + num;
      expect(_.reduce(arr, iteratee)).to.equal(20);
    });
  });
});
