const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');

/*
Make sure tests mirror their seperation of concerns
Refactor all input checking to check in order of arguments passed
Ensure all methods using a iteratee/predicate bind context the same way
Extend testing for invalid inputs
#sortedIndex is very messy, needs refactor
Check all 'it' descriptions to ensure they match the tests
*/

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

    it('returns only the first argument that was passed to it', () => {
      let value = 'foo';
      expect(_.identity(value, 'hello', 'world')).to.equal(value);

      value = [10];
      expect(_.identity(value, true)).to.equal(value);
      expect(_.identity(value, false)).to.eql(value);

      value = { foo: 'bar' };
      expect(_.identity(value, 1010)).to.equal(value);
      expect(_.identity(value, 1010)).to.eql(value);
    });
  });


  describe('#values', () => {
    it('is a function', () => {
      expect(_.values).to.be.a('function');
    });

    it('returns an array containing the values of an object', () => {
      const inputObj = { one: 10, two: 'hello', three: true };

      expect(_.values(inputObj)).to.eql([10, 'hello', true]);
    });

    it('returns a shallow copy of the input array', () => {
      const inputArr = ['h', [1], [1, 2, 3]];

      expect(_.values(inputArr)).to.not.equal(inputArr);
      expect(_.values(inputArr)).to.eql(['h', [1], [1, 2, 3]]);
    });

    it('returns an empty array for non-objects/arrays', () => {
      expect(_.values(true)).to.eql([]);
      expect(_.values()).to.eql([]);
      expect(_.values(12345)).to.eql([]);
      expect(_.values('12345')).to.eql([]);
    });

    it('returns an empty array if passed the object null', () => {
      expect(_.values(null)).to.eql([]);
    });
  });


  describe('#first', () => {
    it('is a function', () => {
      expect(_.first).to.be.a('function');
    });

    it('does not mutate the input array', () => {
      const inputArr = [0, 1, 2, 3];

      expect(_.first(inputArr)).to.not.equal(inputArr);
    });

    it('returns the first n values of an array', () => {
      const inputArr = [0, 1, 2, 3];

      expect(_.first(inputArr, 1)).to.eql([0]);
      expect(_.first(inputArr, 2)).to.eql([0, 1]);
      expect(_.first(inputArr, 3)).to.eql([0, 1, 2]);
    });

    it('returns the value of the first item if n is not provided', () => {
      let inputArr = [0, 1, 2, 3];
      expect(_.first(inputArr)).to.equal(0);

      inputArr = ['foo', 'bar'];
      expect(_.first(inputArr)).to.equal('foo');
    });

    it('returns the whole array if n > array length', () => {
      const inputArr = [0, 1, 2, 3];
      expect(_.first(inputArr, 99)).to.not.equal(inputArr);
      expect(_.first(inputArr, 99)).to.eql(inputArr);
    });

    it('returns an empty array if n <= 0', () => {
      const inputArr = [0, 1, 2, 3];

      expect(_.first(inputArr, 0)).to.eql([]);
      expect(_.first(inputArr, -1)).to.eql([]);
      expect(_.first(inputArr, -99)).to.eql([]);
    });

    it('works for strings', () => {
      expect(_.first('hello')).to.equal('h');
      expect(_.first('hello', 2)).to.eql(['h', 'e']);
      expect(_.first('hello', 99)).to.eql(['h', 'e', 'l', 'l', 'o']);
    });

    it('accepts n as a string', () => {
      expect(_.first('hello', '1')).to.eql(['h']);
      expect(_.first('hello', '3')).to.eql(['h', 'e', 'l']);
      expect(_.first('hello', '99')).to.eql(['h', 'e', 'l', 'l', 'o']);
      expect(_.first('hello', '0')).to.eql([]);
      expect(_.first('hello', '-1')).to.eql([]);
    });

    it('rounds decimal n down to a whole figure', () => {
      expect(_.first([1, 2, 3], 1.9)).to.eql([1]);
      expect(_.first([1, 2, 3], 2.9)).to.eql([1, 2]);
      expect(_.first([1, 2, 3], 3.9)).to.eql([1, 2, 3]);
    });

    it('returns undefined for invalid inputs', () => {
      expect(_.first(true)).to.equal(undefined);
      expect(_.first(null)).to.equal(undefined);
      expect(_.first({ 1: 1, 2: 2, 3: 3 })).to.equal(undefined);
      expect(_.first(31415)).to.equal(undefined);
    });

    it('returns an empty array for invalid n inputs', () => {
      expect(_.first([1], NaN)).to.eql([]);
      expect(_.first([1], 'a')).to.eql([]);
      expect(_.first([1], false)).to.eql([]);
      expect(_.first([1], [1, 2, 3])).to.eql([]);
    });
  });


  describe('#last', () => {
    it('is a function', () => {
      expect(_.last).to.be.a('function');
    });

    it('does not mutate the input array', () => {
      const inputArr = [0, 1, 2, 3];
      expect(_.last(inputArr)).to.not.equal(inputArr);
    });

    it('returns the last n values of an array', () => {
      const inputArr = [0, 1, 2, 3];
      expect(_.last(inputArr, 1)).to.eql([3]);
      expect(_.last(inputArr, 2)).to.eql([2, 3]);
      expect(_.last(inputArr, 3)).to.eql([1, 2, 3]);
    });

    it('returns the value of the last item if n is not provided', () => {
      let inputArr = [0, 1, 2, 3];
      expect(_.last(inputArr)).to.equal(3);

      inputArr = ['foo', 'bar'];
      expect(_.last(inputArr)).to.equal('bar');
    });

    it('returns the whole array if n > array length', () => {
      const inputArr = [0, 1, 2, 3];
      expect(_.last(inputArr, 10)).to.eql([0, 1, 2, 3]);
    });

    it('returns an empty array if n <= 0', () => {
      const inputArr = [0, 1, 2, 3];
      expect(_.last(inputArr, 0)).to.eql([]);
      expect(_.last(inputArr, -1)).to.eql([]);
      expect(_.last(inputArr, -99)).to.eql([]);
    });

    it('works with strings', () => {
      expect(_.last('foobar')).to.equal('r');
      expect(_.last('foobar', 2)).to.eql(['a', 'r']);
      expect(_.last('foobar', 100)).to.eql(['f', 'o', 'o', 'b', 'a', 'r']);
    });

    it('accepts n as a string', () => {
      expect(_.last('hello', '1')).to.eql(['o']);
      expect(_.last('hello', '3')).to.eql(['l', 'l', 'o']);
      expect(_.last('hello', '99')).to.eql(['h', 'e', 'l', 'l', 'o']);
      expect(_.last('hello', '0')).to.eql([]);
      expect(_.last('hello', '-1')).to.eql([]);
    });

    it('rounds decimal n up to a whole figure', () => {
      expect(_.last([1, 2, 3], 0.9)).to.eql([3]);
      expect(_.last([1, 2, 3], 1.001)).to.eql([2, 3]);
      expect(_.last([1, 2, 3], 2.3)).to.eql([1, 2, 3]);
    });

    it('returns undefined for invalid list inputs', () => {
      expect(_.last(true)).to.eql(undefined);
      expect(_.last(null)).to.eql(undefined);
      expect(_.last({ 1: 1, 2: 2, 3: 3 })).to.eql(undefined);
      expect(_.last(31415)).to.eql(undefined);
    });

    it('returns a copy of the input array for invalid n inputs', () => {
      const inputArr = [0, 1, 2, 3, 4];
      expect(_.last(inputArr, 'o')).to.eql(inputArr);
      expect(_.last(inputArr, NaN)).to.eql(inputArr);
      expect(_.last(inputArr, ['o'])).to.eql(inputArr);
      expect(_.last(inputArr, { foo: 'bar' })).to.eql(inputArr);
    });
  });


  describe('#each', () => {
    it('is a function', () => {
      expect(_.each).to.be.a('function');
    });

    it('invokes the iteratee for each item in an array', () => {
      const testSpy = sinon.spy();
      _.each([1, 2, 3, 4], testSpy);
      expect(testSpy.callCount).to.equal(4);

      testSpy.reset();
      _.each([1, 2, 3, 4, 5, 6, 7, 8], testSpy);
      expect(testSpy.callCount).to.equal(8);
    });

    it('invokes the iteratee for each item in an object', () => {
      const testSpy = sinon.spy();
      _.each({ 1: 1, 2: 2, 3: 3 }, testSpy);
      expect(testSpy.callCount).to.equal(3);

      testSpy.reset();
      _.each({ 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 }, testSpy);
      expect(testSpy.callCount).to.equal(5);
    });

    it('passes the following arguments in order to the iteratee - value, index/key, list', () => {
      const testSpy = sinon.spy();
      _.each(['value_0', 'value_1'], testSpy);

      expect(testSpy.args).to.eql([
        ['value_0', 0, ['value_0', 'value_1']],
        ['value_1', 1, ['value_0', 'value_1']]
      ]);

      testSpy.reset();
      _.each({ key_0: 'value_0', key_1: 'value_1' }, testSpy);

      expect(testSpy.args).to.eql([
        ['value_0', 'key_0', { key_0: 'value_0', key_1: 'value_1' }],
        ['value_1', 'key_1', { key_0: 'value_0', key_1: 'value_1' }]
      ]);
    });

    it('passes reference of the list to the iteratee', () => {
      const testSpy = sinon.spy();
      const inputArr = [1, 2, 3];

      _.each(inputArr, testSpy);

      expect(testSpy.args[0][2]).to.equal(inputArr);
    });

    it('works for strings', () => {
      const testSpy = sinon.spy();
      _.each('012', testSpy);

      expect(testSpy.callCount).to.equal(3);

      expect(testSpy.args).to.eql([
        ['0', 0, '012'],
        ['1', 1, '012'],
        ['2', 2, '012']
      ]);
    });

    it('takes a context argument for arrays', () => {
      const FoodList = {
        addItem: food => `I like ${food}`,
      };

      const foodArr = [];

      _.each(['pies', 'roast dinner', 'chutney'], function (item) {
        foodArr.push(this.addItem(item));
      }, FoodList);

      expect(foodArr).to.eql(['I like pies', 'I like roast dinner', 'I like chutney']);

    });

    it('takes a context argument for objects', () => {
      const FoodList = {
        addItem: food => `I like ${food}`,
      };

      const foodArr = [];

      _.each({ 0: 'risotto', 1: 'soup', 2: 'more pies' }, function (item) {
        foodArr.push(this.addItem(item));
      }, FoodList);

      expect(foodArr).to.eql(['I like risotto', 'I like soup', 'I like more pies']);
    });

    it('returns the first argument if given invalid input list', () => {
      expect(_.each(3.1415, _.identity)).to.equal(3.1415);
      expect(_.each(NaN, _.identity)).to.eql(NaN);
      expect(_.each(true, _.identity)).to.equal(true);
      expect(_.each(undefined, _.identity)).to.equal(undefined);
      expect(_.each(null, _.identity)).to.equal(null);
      expect(_.each([], _.identity)).to.eql([]);
    });

    it('throws a TypeError if given invalid iteratee', () => {
      expect(function () { _.each([0, 1, 2, 3], 'hello'); }).to.throw(TypeError);
      expect(function () { _.each([0, 1, 2, 3], null); }).to.throw(TypeError);
      expect(function () { _.each([0, 1, 2, 3], undefined); }).to.throw(TypeError);
    });
  });


  describe('#indexOf', () => {
    it('is a function', () => {
      expect(_.indexOf).to.be.a('function');
    });

    it('returns the index of a given value in an array', () => {
      const inputArr = ['a', 'b', 'c'];

      expect(_.indexOf(inputArr, 'a')).to.equal(0);
      expect(_.indexOf(inputArr, 'b')).to.equal(1);
      expect(_.indexOf(inputArr, 'c')).to.equal(2);
    });

    it('handles nested arrays and objects', () => {
      const nestedArr = ['foo'];
      expect(_.indexOf([nestedArr], nestedArr)).to.equal(0);
      expect(_.indexOf([0, 1, 2, nestedArr, 4, 5], nestedArr)).to.equal(3);

      const nestedObj = { foo: 'bar' };
      expect(_.indexOf([nestedObj], nestedObj)).to.equal(0);
      expect(_.indexOf([0, 1, 2, nestedObj, 4, 5], nestedObj)).to.equal(3);
    });

    it('returns -1 if array does not contain value', () => {
      const inputArr = ['a', 'b', 'c'];

      expect(_.indexOf(inputArr, 'aa')).to.equal(-1);
      expect(_.indexOf(inputArr, 1)).to.equal(-1);
      expect(_.indexOf(inputArr, 'true')).to.equal(-1);
    });

    it('works for strings', () => {
      expect(_.indexOf('hello', 'h')).to.equal(0);
      expect(_.indexOf('hello', 'l')).to.equal(2);
      expect(_.indexOf('hello', 'o')).to.equal(4);
      expect(_.indexOf('hello', 'x')).to.equal(-1);
    });

    it('returns index via binary search of value in a sorted array', () => {
      const inputArr = [0, 10, 20, 30, 40, 50];
      expect(_.indexOf(inputArr, 20, true)).to.equal(2);
      expect(_.indexOf(inputArr, 50, true)).to.equal(5);
      expect(_.indexOf(inputArr, 'hi', true)).to.equal(-1);

      const shuffledArr = [0, 50, 20, 40, 10, 30];
      expect(_.indexOf(shuffledArr, 10, true)).to.equal(-1);
    });

    it('starts searching at a specific index if given a number as the third argument', () => {
      const inputArr = [0, 10, 20, 30, 40, 50];

      expect(_.indexOf(inputArr, 10, 3)).to.equal(-1);
      expect(_.indexOf(inputArr, 50, 1)).to.equal(5);
      expect(_.indexOf(inputArr, 40, 1)).to.equal(4);
    });

    it('returns -1 if given invalid input list or invalid third argument', () => {
      expect(_.indexOf()).to.equal(-1);
      expect(_.indexOf(1, 2, 3)).to.equal(-1);
      expect(_.indexOf([], NaN, NaN)).to.equal(-1);
    });

    it('returns -1 for invalid startFrom third arguments', () => {
      const inputArr = [0, 10, 20, 30, 40, 50];

      expect(_.indexOf(inputArr, 30, -2)).to.equal(-1);
      expect(_.indexOf(inputArr, 30, 9000)).to.equal(-1);

      expect(_.indexOf(inputArr, 30, 0.5)).to.equal(-1);
      expect(_.indexOf(inputArr, 30, 1.1)).to.equal(-1);
    });
  });


  describe('#filter', () => {
    it('is a function', () => {
      expect(_.filter).to.be.a('function');
    });

    it('invokes the predicate for each item in the list', () => {
      let inputArr = [0, 1, 2, 3, 4, 5];
      let testSpy = sinon.spy();
      _.filter(inputArr, testSpy);

      expect(testSpy.callCount).to.equal(inputArr.length);

      testSpy.reset();

      inputArr = [0, 1, 2, 3];
      _.filter(inputArr, testSpy);

      expect(testSpy.callCount).to.equal(inputArr.length);
    });

    it('only returns list items that pass the predicate test', () => {
      let inputArr = [0, 1, 2, 3, 4, 5];

      let predicate = (num) => num > 2;
      expect(_.filter(inputArr, predicate)).to.eql([3, 4, 5]);

      inputArr = ['a', 'b', 'c'];

      predicate = (char) => char === 'b';
      expect(_.filter(inputArr, predicate)).to.eql(['b']);

      predicate = (char) => char === 'hi';
      expect(_.filter(inputArr, predicate)).to.eql([]);
    });

    it('works with the values of objects', () => {
      const testSpy = sinon.spy();
      let inputObj = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5 };

      _.filter(inputObj, testSpy);
      expect(testSpy.callCount).to.eql(_.values(inputObj).length);

      let predicate = (num) => num > 2;
      expect(_.filter(inputObj, predicate)).to.eql([3, 4, 5]);
    });

    it('works with the characters of strings', () => {
      const testSpy = sinon.spy();
      let inputStr = 'hello world';

      _.filter(inputStr, testSpy);
      expect(testSpy.callCount).to.eql(inputStr.length);

      let predicate = (char) => char === 'h';
      expect(_.filter(inputStr, predicate)).to.eql(['h']);
    });

    it('takes a context argument for arrays', () => {
      const contextObj = {
        predicate: item => item > 2,
      };

      const result = _.filter([0, 1, 2, 3, 4, 5], function (item) {
        return this.predicate(item);
      }, contextObj);

      expect(result).to.eql([3, 4, 5]);
    });

    it('takes a context argument for objects', () => {
      const contextObj = {
        predicate: item => item > 2,
      };

      const result = _.filter({ a: 1, b: 2, c: 3, d: 4, e: 5 }, function (item) {
        return this.predicate(item);
      }, contextObj);

      expect(result).to.eql([3, 4, 5]);
    });

    it('returns an empty array for invalid list inputs', () => {
      const predicate = () => true;

      expect(_.filter(true, predicate)).to.eql([]);
      expect(_.filter(10101, predicate)).to.eql([]);
      expect(_.filter({}, predicate)).to.eql([]);
    });

    it('returns an empty array for invalid predicate inputs', () => {
      const inputArr = [1, 2, 3, 4, 5];

      expect(_.filter(inputArr, true)).to.eql([]);
      expect(_.filter(inputArr, NaN)).to.eql([]);
      expect(_.filter(inputArr, 'predicate')).to.eql([]);
    });

    it('functions as normal if given invalid context input', () => {
      const inputArr = [1, 2, 3, 4, 5];
      const predicate = (val) => val % 2 === 0;

      expect(_.filter(inputArr, predicate, 'context')).to.eql([2, 4]);
      expect(_.filter(inputArr, predicate, 10101)).to.eql([2, 4]);
      expect(_.filter(inputArr, predicate, [])).to.eql([2, 4]);
    });
  });


  describe('#reject', () => {
    it('is a function', () => {
      expect(_.reject).to.be.a('function');
    });

    it('invokes the predicate for each item in the list', () => {
      const inputArr = [0, 1, 2, 3, 4, 5];
      const testSpy = sinon.spy();

      _.reject(inputArr, testSpy);

      expect(testSpy.callCount).to.equal(inputArr.length);
    });

    it('should return a list of items that fail the predicate test', () => {
      const inputArr = [0, 1, 2, 3, 4, 5];
      let predicate = (num) => num > 2;
      expect(_.reject(inputArr, predicate)).to.eql([0, 1, 2]);

      const inputObj = { a: 'a', b: 'b', c: 'c' };
      predicate = (char) => char === 'b';
      expect(_.reject(inputObj, predicate)).to.eql(['a', 'c']);

      const inputStr = 'hello world';
      predicate = (char) => char === 'h';
      expect(_.reject(inputStr, predicate)).to.eql('ello world'.split(''));
    });
  });


  describe('#uniq', () => {
    it('is a function', () => {
      expect(_.uniq).to.be.a('function');
    });

    it('removes duplicate entries from array', () => {
      let inputArr = [1, '2', 1, 'three'];
      expect(_.uniq(inputArr)).to.eql([1, '2', 'three']);

      inputArr = [null, undefined, null, undefined];
      expect(_.uniq(inputArr)).to.eql([null, undefined]);
    });

    it('yeilds EVERY item to an interatee, regardless of being unique or not', () => {
      const inputArr = [1, 2, 3, 2, 3];
      const testSpy = sinon.spy();
      _.uniq(inputArr, false, testSpy);

      expect(testSpy.callCount).to.equal(inputArr.length);
    });

    it('passes the following arguments in order to the iteratee - value, index/key, list', () => {
      const inputArr = [1, 1, 2];
      const testSpy = sinon.spy();

      _.uniq(inputArr, false, testSpy);
      expect(testSpy.args).to.eql([
        [1, 0, inputArr],
        [1, 1, inputArr],
        [2, 2, inputArr]
      ]);
    });

    it('works with strings', () => {
      expect(_.uniq('hello')).to.eql(['h', 'e', 'l', 'o']);
      expect(_.uniq('1232123')).to.eql(['1', '2', '3']);
    });

    it('filters array via faster binary search', () => {
      const inputArr = [1, 2, 2, 2, 3, 3];
      const unsortedInputArr = [3, 1, 2, 3, 1, 1, 2];

      expect(_.uniq(inputArr, true)).to.eql([1, 2, 3]);
      expect(_.uniq(unsortedInputArr, true)).to.not.eql([1, 2, 3]);
    });

    it('returns empty array when given invalid array input', () => {
      expect(_.uniq(1)).to.eql([]);
      expect(_.uniq({ 1: 1, 2: 2 })).to.eql([]);
      expect(_.uniq(null)).to.eql([]);
      expect(_.uniq([])).to.eql([]);
    });
  });


  describe('#map', () => {
    it('is a function', () => {
      expect(_.map).to.be.a('function');
    });

    it('yields each item to the iteratee', () => {
      const testSpy = sinon.spy();
      const inputArr = [1, 2, 3];

      _.map(inputArr, testSpy);

      expect(testSpy.callCount).to.equal(inputArr.length);
    });

    it('passes the following arguments in order to the iteratee - value, index/key, list', () => {
      const testSpy = sinon.spy();
      const inputArr = [1, 2, 3];

      _.map(inputArr, testSpy);

      expect(testSpy.args).to.eql([
        [1, 0, inputArr],
        [2, 1, inputArr],
        [3, 2, inputArr]
      ]);
    });

    it('returns a new transformed array without mutating the original input', () => {
      const inputArr = [1, 2, 3];

      const result = _.map(inputArr, (item) => {
        return item * 10;
      });

      expect(result).to.eql([10, 20, 30]);
      expect(inputArr).to.eql([1, 2, 3]);
      expect(result).to.not.equal(inputArr);
    });

    it('works with the values of an object', () => {
      const inputObj = { 0: 'a', 1: 'b', 2: 'c' };

      const result = _.map(inputObj, (char) => {
        return char.toUpperCase();
      });

      expect(result).to.eql(['A', 'B', 'C']);
    });

    it('works with the characters of a string', () => {
      const result = _.map('hello world', (char) => {
        return char.toUpperCase();
      });

      expect(result).to.eql('HELLO WORLD'.split(''));
    });

    it('takes a context argument', () => {
      const iterateeObj = {
        iteratee: char => char.toUpperCase(),
      };

      const result = _.map('abc', function (item) {
        return this.iteratee(item);
      }, iterateeObj);

      expect(result).to.eql(['A', 'B', 'C']);
    });

    it('returns an empty array when given invalid input list', () => {
      expect(_.map(true)).to.eql([]);
      expect(_.map(1010)).to.eql([]);
      expect(_.map(null)).to.eql([]);
      expect(_.map(undefined)).to.eql([]);
    });
  });


  describe('#contains', () => {
    it('is a function', () => {
      expect(_.contains).to.be.a('function');
    });

    it('returns true if value is present in list', () => {
      const inputArr = [1, 2, 3, 4];
      expect(_.contains(inputArr, 1)).to.be.true;
      expect(_.contains(inputArr, 4)).to.be.true;
    });

    it('returns false if value is not present in the array', () => {
      const inputArr = [1, 2, 3, 4];
      expect(_.contains(inputArr, 'foo')).to.be.false;
      expect(_.contains(inputArr, '2')).to.be.false;
    });

    it('starts searching from given index', () => {
      const inputArr = [1, 2, 3, 4];
      expect(_.contains(inputArr, 1, 3)).to.be.false;
      expect(_.contains(inputArr, 4, 2)).to.be.true;
    });
  });


  describe('#pluck', () => {
    it('should be a function', () => {
      expect(_.pluck).to.be.a('function');
    });

    it('returns an array containing an extracted target value from an array of objects', () => {
      const inputArr = [
        { name: 'moe', age: 40 },
        { name: 'larry', age: 50 },
        { name: 'curly', age: 60 }
      ];

      expect(_.pluck(inputArr, 'name')).to.eql(['moe', 'larry', 'curly']);
      expect(_.pluck(inputArr, 'age')).to.eql([40, 50, 60]);
    });

    it('returns undefined when target value is not present in object', () => {
      const inputArr = [
        { foo: 'bar' },
        { foo: 'bar' }
      ];

      expect(_.pluck(inputArr, 'banana')).to.eql([undefined, undefined]);
    });
  });


  describe('#reduce', () => {
    it('should be a function', () => {
      expect(_.reduce).to.be.a('function');
    });

    it('returns a single value calculated by iterating through each array item', () => {
      const inputArr = [5, 5, 5, 5, 5];
      let iteratee = (memo, value) => memo + value;
      expect(_.reduce(inputArr, iteratee, 0)).to.equal(25);

      const inputObj = { a: 1, b: 2, c: 3 };
      expect(_.reduce(inputObj, iteratee, 0)).to.equal(6);
    });

    it('uses the first list item as the memo (starting value) if memo is not supplied', () => {
      const inputArr = [5, 5, 5, 5, 5];
      const iteratee = (memo, num) => memo * num;
      expect(_.reduce(inputArr, iteratee)).to.equal(Math.pow(5, 5));

      const inputObj = { a: 5, b: 5, c: 5, d: 5, e: 5 };
      expect(_.reduce(inputObj, iteratee)).to.equal(Math.pow(5, 5));
    });

    it('does not mutate the input list', () => {
      const inputArr = [5, 5, 5, 5, 5];
      const inputObj = { a: 5, b: 5, c: 5, d: 5, e: 5 };

      const iteratee = (memo, num) => memo + num;

      const arrResult = _.reduce(inputArr, iteratee);
      const objResult = _.reduce(inputObj, iteratee);

      expect(inputArr).to.eql([5, 5, 5, 5, 5]);
      expect(inputObj).to.eql({ a: 5, b: 5, c: 5, d: 5, e: 5 });

      expect(arrResult).to.not.equal(inputArr);
      expect(objResult).to.not.equal(inputObj);
    });

    it('takes a context argument', () => {
      const contextObj = {
        contextIteratee: (memo, num) => memo + num,
      };

      const iteratee = function (memo, value) {
        return this.contextIteratee(memo, value);
      };

      const arrResult = _.reduce([5, 5, 5, 5, 5], iteratee , 0, contextObj);

      const objResult = _.reduce({ a: 5, b: 5, c: 5, d: 5, e: 5 }, iteratee, 0, contextObj);

      expect(arrResult).to.eql(25);
      expect(objResult).to.eql(25);
    });

    it('works with the characters in strings', () => {
      const contextObj = {
        iteratee: (memo, num) => (memo + num).toUpperCase(),
      };

      const strResult = _.reduce('foo', function (memo, value) {
        return this.iteratee(memo, value);

      }, '', contextObj);

      expect(strResult).to.equal('FOO');
    });

    it('returns undefined if given invalid list', () => {
      expect(_.reduce(true)).to.equal(undefined);
      expect(_.reduce(123)).to.equal(undefined);
      expect(_.reduce(NaN)).to.equal(undefined);
    });

    it('throws type error if given invalid iteratee function', () => {
      expect(function () { _.reduce([1, 2, 3], true); }).to.throw(TypeError);
      expect(function () { _.reduce([1, 2, 3], 123); }).to.throw(TypeError);
      expect(function () { _.reduce([1, 2, 3], 'foo'); }).to.throw(TypeError);
    });
  });


  describe('#every', () => {
    it('should be a function', () => {
      expect(_.every).to.be.a('function');
    });

    it('returns true if every list value passes the predicate', () => {
      const inputArr = [true, true, true];
      const predicate = value => value;
      expect(_.every(inputArr, predicate)).to.be.true;

      const inputObj = { 0: true, 1: true, 2: true };
      expect(_.every(inputObj, predicate)).to.be.true;
    });

    it('returns false if one of the values fails the predicate', () => {
      const inputArr = [true, false, true, true];
      const predicate = value => value;
      expect(_.every(inputArr, predicate)).to.be.false;

      const inputObj = { 1: true, 2: false, 3: true };
      expect(_.every(inputObj, predicate)).to.be.false;
    });

    it('short-circuits if one value fails', () => {
      const predicate = value => value;
      let testSpy = sinon.spy(predicate);
      
      const inputArr = [true, false, true, true];
      _.every(inputArr, testSpy);
      expect(testSpy.calledTwice).to.be.true;

      testSpy.reset();

      const inputObj = { 0: true, 1: false, 2: true };
      _.every(inputObj, testSpy);

      expect(testSpy.callCount).to.equal(2);
    });

    it('takes a context argument', () => {
      const contextObj = {
        value: 'pass'
      };

      const predicate = function (value) {
        return value === this.value;
      };

      expect(_.every(['pass', 'pass', true], predicate, contextObj)).to.be.false;
      expect(_.every(['pass', 'pass', 'pass'], predicate, contextObj)).to.be.true;
    });

    it('works with the characters of strings', () => {
      let predicate = value => value === 'f';
      let testSpy = sinon.spy(predicate);
      
      let inputStr = 'fff';
      expect(_.every(inputStr, testSpy)).to.be.true;
      expect(testSpy.callCount).to.equal(3);

      testSpy.reset();

      inputStr = 'foo';
      expect(_.every(inputStr, testSpy)).to.be.false;
      expect(testSpy.calledTwice).to.be.true;
    });

    it('returns true if given invalid list', () => {
      expect(_.every()).to.be.true;
      expect(_.every(123)).to.be.true;
      expect(_.every(null)).to.be.true;
      expect(_.every(NaN)).to.be.true;
    });

    it('returns true if given invalid predicate', () => {
      expect(_.every([1, 2, 3], NaN)).to.be.false;
      expect(_.every([1, 2, 3], 123)).to.be.false;
      expect(_.every([1, 2, 3], 'foo')).to.be.false;
    });
  });


  describe('#some', () => {
    it('should be a function', () => {
      expect(_.some).to.be.a('function');
    });

    it('returns true if some of the values in the list pass the predicate', () => {
      const inputArr = [0, 1, 2, 3, 4, 5];
      const predicate = num => num === 3;
      expect(_.some(inputArr, predicate)).to.be.true;

      const inputObj = { a: 0, b: 1, c: 2, d: 3, e: 4 };
      expect(_.some(inputObj, predicate)).to.be.true;
    });

    it('returns false if none of the values in the list pass the predicate', () => {
      const inputArr = [0, 1, 2, 3, 4, 5];
      const predicate = num => num === 'foo';
      expect(_.some(inputArr, predicate)).to.be.false;

      const inputObj = { a: 0, b: 1, c: 2, d: 3, e: 4 };
      expect(_.some(inputObj, predicate)).to.be.false;
    });

    it('short-circuits of one item passes', () => {
      const predicate = num => num === 'foo';
      const testSpy = sinon.spy(predicate);

      const inputArr = [1, 'foo', 3, 2, 1, 0];
      _.some(inputArr, testSpy);
      expect(testSpy.callCount).to.equal(2);

      testSpy.reset();

      const inputObj = { a: 0, b: 'foo', c: 2, d: 3 };
      _.some(inputObj, testSpy);
      expect(testSpy.callCount).to.equal(2);
    });

    it('takes a context argument', () => {
      const contextObj = {
        value: 'pass'
      };

      const predicate = function (value) {
        return value === this.value;
      };

      expect(_.some([false, false, false], predicate, contextObj)).to.be.false;
      expect(_.some([false, false, 'pass'], predicate, contextObj)).to.be.true;
    });

    it('works with the characters in strings', () => {
      let predicate = value => value === '2';
      let testSpy = sinon.spy(predicate);
      
      let inputStr = '123';
      expect(_.some(inputStr, testSpy)).to.be.true;
      expect(testSpy.callCount).to.equal(2);

      testSpy.reset();

      inputStr = 'foo';
      expect(_.some(inputStr, testSpy)).to.be.false;
      expect(testSpy.callCount).to.equal(3);
    });

    it('returns false if given invalid list', () => {
      expect(_.some()).to.be.false;
      expect(_.some(false)).to.be.false;
      expect(_.some(123)).to.be.false;
      expect(_.some(null)).to.be.false;
    });

    it('returns false if given invalid predicate', () => {
      expect(_.some([1, 2, 3], 'foo')).to.be.false;
      expect(_.some([1, 2, 3], 123)).to.be.false;
      expect(_.some([1, 2, 3], false)).to.be.false;
      expect(_.some([1, 2, 3], true)).to.be.false;
    });
  });


  describe('#extend', () => {
    it('should be a function', () => {
      expect(_.extend).to.be.a('function');
    });

    it('makes a shallow copy of the properties in the source lists into the destination', () => {
      const destination = { hello: 'world' };
      const copy = _.extend(destination, { foo: 'bar' }, { fish: 'pie' });
      expect(copy).to.eql({ hello: 'world', foo: 'bar', fish: 'pie' });
    });

    it('makes copies by reference', () => {
      const destination = { hello: 'world' };
      const reference = { foo: 'bar' };
      const copy = _.extend(destination, { reference });
      expect(copy.reference).to.equal(reference);
    });

    it('mutates the original object', () => {
      const inputObj = {};
      expect(_.extend(inputObj, { foo: 'bar' })).to.equal(inputObj);
    });

    it('runs in-order, so the last source will override properties of the same name in previous arguments', () => {
      const destination = { hello: 'world' };
      const copy = _.extend(destination, { foo: 'sushi' }, { foo: 'bar' });
      expect(copy.foo).to.equal('bar');
    });

    it('returns the key-value pair of index-value when given an array as secondary argument', () => {
      const copy = _.extend({ hello: 'world' }, [0, 1, 2]);
      expect(copy).to.eql({ 0: 0, 1: 1, 2: 2, hello: 'world' });
    });
  });

  describe('#defaults', () => {
    it('should be a function', () => {
      expect(_.defaults).to.be.a('function');
    });

    it('fills in undefined properties in the object with the default list', () => {
      const destination = { foo: 'bar' };
      const defaultObjs = { foo: 'ice-cream', yes: 'no' };
      expect(_.defaults(destination, defaultObjs)).to.eql({ foo: 'bar', yes: 'no' });
    });

    it('uses the first value present in the default lists', () => {
      const destination = { foo: 'bar' };
      expect(_.defaults(destination,
        { foo: 'ice-cream' },
        { yes: 'no' },
        { yes: 'maybe' }
      )).to.eql({ foo: 'bar', yes: 'no' });
    });
  });

  describe('#once', () => {
    it('should be a function', () => {
      expect(_.once).to.be.a('function');
    });

    it('returns a function', () => {
      expect(_.once()).to.be.a('function');
    });

    it('allows the invocation of the passed function', () => {
      const func = () => 'foobar';
      const wrappedFunc = _.once(func);
      expect(wrappedFunc()).to.equal('foobar');
    });

    it('allows arguments to be passed to the wrapped function', () => {
      const func = (working) => working ? 'hello world' : 'foobar';
      let wrappedFunc = _.once(func);

      expect(wrappedFunc(false)).to.equal('foobar');

      wrappedFunc = _.once(func);
      expect(wrappedFunc(true)).to.equal('hello world');
    });

    it('only allows one invocation of the wrapped function', () => {
      const func = (working) => working ? 'once' : 'twice';
      let wrappedFunc = _.once(func);

      expect(wrappedFunc(true)).to.equal('once');
      expect(wrappedFunc(false)).to.not.equal('twice');
    });

    it('should always return the result of the first invocation', () => {
      const wrappedFunc = _.once(_.identity);
      let resultArr = [];
      resultArr.push(wrappedFunc('foo'));
      resultArr.push(wrappedFunc('bar'));
      resultArr.push(wrappedFunc('hello world'));
      expect(resultArr).to.eql(['foo', 'foo', 'foo']);
    });
  });

  describe('#negate', () => {
    it('should be a function', () => {
      expect(_.negate).to.be.a('function');
    });

    it('returns a function', () => {
      expect(_.negate()).to.be.a('function');
    });

    it('returns a negated predicate', () => {
      const boolArr = [true, false];
      const predicate = bool => bool;
      const negatedPred = _.negate(predicate);

      const result = _.filter(boolArr, negatedPred);
      expect(result).to.eql([false]);
    });
  });

  describe('#shuffle', () => {
    it('should be a function', () => {
      expect(_.shuffle).to.be.a('function');
    });

    it('returns an array of the same length', () => {
      const inputArr = [0, 1, 2, 3, 4, 5];
      const shuffled = _.shuffle(inputArr);

      expect(inputArr.length).to.equal(shuffled.length);
    });

    it('returns an array containing the same values', () => {
      const inputArr = [0, 1, 2, 3, 4, 5];
      const shuffled = _.shuffle(inputArr);

      expect(shuffled).to.include(0, 1, 2, 3, 4, 5);
    });

    it('produces a different shuffle (nearly) every time', () => {
      const inputArr = [0, 1, 2, 3, 4, 5];
      const firstShuffle = _.shuffle(inputArr);
      const secondShuffle = _.shuffle(inputArr);

      expect(firstShuffle).to.not.eql(secondShuffle);
    });

    it('works for objects', () => {
      const inputObj = {
        a: 0,
        b: 1,
        c: 2,
        d: 3,
        e: 4,
        f: 5
      };

      const shuffled = _.shuffle(inputObj);

      expect(shuffled).to.include(0, 1, 2, 3, 4, 5);
      expect(_.values(inputObj).length).to.equal(shuffled.length);

    });

    it('works for strings', () => {
      const inputStr = '012345';
      const shuffled = _.shuffle(inputStr);

      expect(shuffled).to.include('0', '1', '2', '3', '4', '5');
      expect(inputStr.length).to.equal(shuffled.length);
    });

    it('does not mutate the input list', () => {
      const inputArr = [0, 1, 2, 3, 4, 5];
      const arrCopy = inputArr.slice();
      _.shuffle(inputArr);
      expect(inputArr).to.eql(arrCopy);

      const inputObj = { 0: 0, 1: 1, 2: 2 };
      const objCopy = Object.assign({}, inputObj);
      _.shuffle(inputObj);
      expect(inputObj).to.eql(objCopy);

      const inputStr = '012345';
      const strCopy = inputStr;
      _.shuffle(inputStr);
      expect(inputStr).to.equal(strCopy);
    });

    it('returns an empty array when passed invalid list input', () => {
      expect(_.shuffle()).to.eql([]);
      expect(_.shuffle(true)).to.eql([]);
      expect(_.shuffle(123)).to.eql([]);
      expect(_.shuffle(NaN)).to.eql([]);
      expect(_.shuffle(null)).to.eql([]);
    });
  });

  describe('#invoke', () => {
    it('should be a function', () => {
      expect(_.invoke).to.be.a('function');
    });

    it('applies an array method on each array value in an array list', () => {
      expect(_.invoke([[2, 4, 1, 3], [4, 6, 5, 7]], 'join'))
        .to.eql(['2,4,1,3', '4,6,5,7']);

      expect(_.invoke([[2, 4, 1, 3], [8, 6, 5, 7]], 'sort'))
        .to.eql([[1, 2, 3, 4], [5, 6, 7, 8]]);
    });

    it('passes any additional arguments to the array method', () => {
      expect(_.invoke([[2, 4, 1, 3], [4, 6, 5, 7]], 'join', '+'))
        .to.eql(['2+4+1+3', '4+6+5+7']);
    });

    it('applies the method to object values', () => {
      expect(_.invoke({ x: 'a', y: 'b', z: 'c' }, 'toUpperCase'))
        .to.eql(['A', 'B', 'C']);
    });

    it('applies the method to string characters', () => {
      expect(_.invoke('foo', 'toUpperCase'))
        .to.eql(['F', 'O', 'O']);
    });

    it('returns an array of undefined items if no method is given', () => {
      expect(_.invoke([1, 2, 3])).to.eql([undefined, undefined, undefined]);
    });

    it('returns undefined on items when an inapppropriate method is given', () => {
      expect(_.invoke([1, 2, 'foo'], 'toUpperCase'))
        .to.eql([undefined, undefined, 'FOO']);

      expect(_.invoke({ a: 'a', b: 'b' }, 'sort'))
        .to.eql([undefined, undefined]);

      expect(_.invoke([[3, 1, 2], 'foo', [5, 4, 6]], 'sort'))
        .to.eql([[1, 2, 3], undefined, [4, 5, 6]]);
    });
  });

  describe('#sortBy', () => {
    it('should be a function', () => {
      expect(_.sortBy).to.be.a('function');
    });

    it('returns a stably sorted copy of the list', () => {
      const inputArr = [0, 1, 2, 3, 4, 5];
      expect(_.sortBy(inputArr)).to.not.equal(inputArr);
    });

    it('returns an array in acending order if passed no iteratee', () => {
      expect(_.sortBy([5, 3, 4, 0, 1, 2])).to.eql([0, 1, 2, 3, 4, 5]);
      expect(_.sortBy(['a', 'c', 'b'])).to.eql(['a', 'b', 'c']);
    });

    it('returns an array sorted by iteratee in acending order', () => {
      const inputArr = ['eggman', 'the', 'am', 'i'];
      const func = x => x.length;
      expect(_.sortBy(inputArr, func)).to.eql(['i', 'am', 'the', 'eggman']);
    });

    it('sorts arrays of objects via a passed property in acending order', () => {
      const inputArr = [
        { name: 'Dave', age: 53 },
        { name: 'Olie', age: 26 },
        { name: 'Holly', age: 42 }
      ];

      const answer = [
        { name: 'Olie', age: 26 },
        { name: 'Holly', age: 42 },
        { name: 'Dave', age: 53 }
      ];
      expect(_.sortBy(inputArr, 'age')).to.eql(answer);
    });

    it('returns an empty array when given invalid list', () => {
      expect(_.sortBy()).to.eql([]);
      expect(_.sortBy(true)).to.eql([]);
      expect(_.sortBy(123)).to.eql([]);
      expect(_.sortBy(null)).to.eql([]);
    });
  });

  describe('#zip', () => {
    it('should be a function', () => {
      expect(_.zip).to.be.a('function');
    });

    it('returns a zipped array of arrays', () => {
      const inputArrays = [
        ['moe', 'larry', 'curly'],
        [30, 40, 50],
        [true, false, false]
      ];

      const expected = [
        ['moe', 30, true],
        ['larry', 40, false],
        ['curly', 50, false]
      ];

      expect(_.zip(...inputArrays)).to.eql(expected);
    });

    it('works for strings', () => {
      const expected = [
        ['h', 'p', 's'],
        ['o', 'i', 'p'],
        ['t', 'e', 'y']
      ];

      expect(_.zip('hot', 'pie', 'spy')).to.eql(expected);
    });

    it('fills in any gaps with undefined', () => {
      const inputArrays = [
        ['moe', 'larry', 'curly'],
        [30],
        [true, false]
      ];

      const expected = [
        ['moe', 30, true],
        ['larry', undefined, false],
        ['curly', undefined, undefined]
      ];

      expect(_.zip(...inputArrays)).to.eql(expected);
    });

    it('returns an empty array if given invalid input', () => {
      const inputArr = [
        { foo: 'bar', hot: 'pie' },
        { cake: 'good', true: false }
      ];

      expect(_.zip(...inputArr)).to.eql([]);
    });
  });

  describe('#sortedIndex', () => {
    it('should be a function', () => {
      expect(_.sortedIndex).to.be.a('function');
    });

    it('returns the index of the correct position', () => {
      const inputArr = [0, 1, 2, 3, 4, 5];

      expect(_.sortedIndex(inputArr, 3.5)).to.equal(4);
      expect(_.sortedIndex(inputArr, 0.5)).to.equal(1);
      expect(_.sortedIndex(inputArr, 4.5)).to.equal(5);
    });

    it('finds index based on passed iteratee', () => {
      const inputArr = ['hello', 'my', 'name', 'is', 'dennis'];

      expect(_.sortedIndex(inputArr, 'a', 'length')).to.equal(0);
      expect(_.sortedIndex(inputArr, 'javascript', 'length')).to.equal(5);
    });

    it('Does stuff', () => {
      expect(_.sortedIndex('abcde', 'c')).to.equal(2);
      expect(_.sortedIndex(['a', 'b', 'c', 'd'], 'c')).to.equal(2);
      expect(_.sortedIndex([{ age: 1 }, { age: 2 }, { age: 3 }], 2.5, 'age')).to.equal(0);
      expect(_.sortedIndex([{ age: 1 }, { age: 2 }, { age: 3 }], { age: 2.5 }, 'age')).to.equal(2);
    });
  });

  describe('#flatten', () => {
    it('should be a function', () => {
      expect(_.flatten).to.be.a('function');
    });

    it('returns a shallowly flattened array when passed true', () => {
      let inputArr = [[[1]], [2], [[3]]];
      expect(_.flatten(inputArr, true)).to.eql([[1], 2, [3]]);
    });

    it('returns a flat array', () => {
      let inputArr = [[1], [2], [3]];
      expect(_.flatten(inputArr)).to.eql([1, 2, 3]);

      inputArr = [[[[1]], [[2]], [3]]];
      expect(_.flatten(inputArr)).to.eql([1, 2, 3]);

      inputArr = [[[[[[[[[1]]]]]]]], [2], [[[[[[[[[3]]]]]]]]]];
      expect(_.flatten(inputArr)).to.eql([1, 2, 3]);
    });

    it('maintains duplicate data', () => {
      const inputArrays = [
        [1, 2, 3],
        [1, 2, 3],
        [1, 2, 3]
      ];

      expect(_.flatten(inputArrays)).to.eql([1, 2, 3, 1, 2, 3, 1, 2, 3]);
    });

    it('works for strings', () => {
      expect(_.flatten('hello')).to.eql('hello'.split(''));
    });

    it('returns an empty array when given invalid array input', () => {
      expect(_.flatten()).to.eql([]);
      expect(_.flatten(null)).to.eql([]);
      expect(_.flatten(123)).to.eql([]);
      expect(_.flatten(NaN)).to.eql([]);
      expect(_.flatten({ 1: 1, 2: 2 })).to.eql([]);
    });
  });

  describe('#intersection', () => {
    it('should be a function', () => {
      expect(_.intersection).to.be.a('function');
    });

    it('returns the common elements between different arrays', () => {
      let inputArrays = [
        [0, 1, 2, 3, 'foo', 'bar'],
        [4, 5, 6, 7, 'foo', 'bar'],
        [8, 9, 10, 'foo', 'bar'],
      ];

      expect(_.intersection(...inputArrays)).to.eql(['foo', 'bar']);

      inputArrays = [
        [{ foo: 'bar' }],
        [1, 2, 3],
        ['hello']
      ];

      expect(_.intersection(...inputArrays)).to.eql([]);
    });

    it('handles nested arrays and objects', () => {
      const nestedArr = [1, 2, 3];
      const nestedObj = { hot: 'pie' };

      const inputArrays = [
        [nestedObj, 0, 1, 2, 3, 'foo', 'bar', nestedArr],
        [nestedObj, 4, 5, 6, 7, 'foo', 'bar', nestedArr],
        [nestedObj, 8, 9, 10, 'foo', 'bar', nestedArr]
      ];

      expect(_.intersection(...inputArrays)).to.eql([nestedObj, 'foo', 'bar', nestedArr]);
    });

    it('maintains order based on first in first out', () => {
      const inputArrays = [
        ['f', 0, 'o', 1, 2, 'O'],
        ['o', 'O', 3, 4, 'f', 5],
        [7, 8, 9, 'o', 'f', 'O']
      ];

      expect(_.intersection(...inputArrays)).to.eql(['f', 'o', 'O']);
      expect(_.intersection(...inputArrays)).to.not.eql(['O', 'o', 'f']);
    });

    //Requires further testing
    it('mirrors underscore.js behaviour for strings', () => {
      expect(_.intersection('foo bar')).to.eql(['f', 'o', ' ', 'b', 'a', 'r']);
      expect(_.intersection('aabbcc')).to.eql(['a', 'b', 'c']);
    });

    it('returns an empty array when given invalid inputs', () => {
      expect(_.intersection({ foo: 'bar' }, { foo: 'bar' })).to.eql([]);
      expect(_.intersection(10, 20, 30, 40)).to.eql([]);
      expect(_.intersection('foo', 'bar')).to.eql([]);
    });
  });

  describe('#difference', () => {
    it('should be a function', () => {
      expect(_.difference).to.be.a('function');
    });

    it('returns the values present in the first array but not present in other arrays', () => {
      expect(_.difference([1, 2, 3, 4, 5], [4], [5])).to.eql([1, 2, 3]);
      expect(_.difference([1, 2, 3, 4, 5], [1], [2])).to.eql([3, 4, 5]);
      expect(_.difference([1, 2, 3, 4, 5], [1, 2, 3])).to.eql([4, 5]);
      expect(_.difference([1, 2, 3, 4, 5], [1, 2, 3, 4, 5])).to.eql([]);
    });

    it('handles nested arrays and objects', () => {
      const nestedArr = [1, 2, 3];
      const nestedObj = { hot: 'pie' };

      const inputArray = [nestedArr, 'hello', 'world', nestedObj, 'foo', 'bar'];

      const inputArrays = [
        [0, 1, 2, 3, 'foo', 'bar', nestedArr],
        [4, 5, 6, 7, 'foo', 'bar', nestedArr]
      ];

      expect(_.difference(inputArray, ...inputArrays)).to.eql(['hello', 'world', nestedObj]);
    });

    it('works for strings', () => {
      expect(_.difference('hello', ['h'])).to.eql('ello'.split(''));
      expect(_.difference('1f2o3o4 5b6a7r8', ['1', '2', '3', '4'], ['5', '6', '7', '8'])).to.eql('foo bar'.split(''));
    });

    it('does not type-convert when comparing values', () => {
      expect(_.difference('1f2o3o4', [1, 2], [3, 4])).to.eql('1f2o3o4'.split(''));
    });

    it('works with object values as target argument', () => {
      expect(_.difference({ a: 0, b: 1, c: 2 }, [0])).to.eql([1, 2]);
      expect(_.difference({ a: 0, b: 1, c: 2 }, [0], [1])).to.eql([2]);

      const nestedArr = ['hello world'];
      expect(_.difference({ a: 0, b: 1, c: nestedArr }, [1])).to.eql([0, nestedArr]);
      expect(_.difference({ a: 0, b: 1, c: nestedArr }, [0], [nestedArr])).to.eql([1]);
    });

    it('returns an empty array when given invalid target array', () => {
      expect(_.difference(123, [1, 2, 3])).to.eql([]);
      expect(_.difference(undefined, [1, 2, 3])).to.eql([]);
      expect(_.difference(null, [1, 2, 3])).to.eql([]);
      expect(_.difference(NaN, [1, 2, 3])).to.eql([]);
    });

    it('returns primary argument when given invalid secondary argument(s)', () => {
      expect(_.difference([1, 2, 3])).to.eql([1, 2, 3]);
      expect(_.difference([1, 2, 3], 123)).to.eql([1, 2, 3]);
      expect(_.difference([1, 2, 3], '123')).to.eql([1, 2, 3]);
      expect(_.difference([1, 2, 3], { 1: 1, 2: 2 })).to.eql([1, 2, 3]);
    });
  });

  //test obscure hashes
  describe('#memoize', () => {
    it('should be a function', () => {
      expect(_.memoize).to.be.a('function');
    });

    it('returns return a function', () => {
      expect(_.memoize()).to.be.a('function');
    });

    it('returns the cached results of the passed function without making additional function calls', () => {
      const func = (arg1, arg2) => arg1 * arg2;
      const testSpy = sinon.spy(func);
      const memoizedFunc = _.memoize(testSpy);

      expect(memoizedFunc(2, 5)).to.equal(10);
      expect(testSpy.calledOnce).to.be.true;
      expect(memoizedFunc(2, 5)).to.equal(10);
      expect(testSpy.calledOnce).to.be.true;
    });

    it('stores the results from the invocation of the passed function in the cache property with a default key of the first passed argument', () => {
      const func = (arg1, arg2) => arg1 * arg2;
      const memoizedFunc = _.memoize(func);

      expect(memoizedFunc(2, 5)).to.equal(10);
      expect(memoizedFunc.cache[2]).to.equal(10);

      expect(memoizedFunc(12, 12)).to.equal(144);
      expect(memoizedFunc.cache[12]).to.equal(144);
    });

    it('generates a hashed key based on a passed hash function', () => {
      const func = (arg1, arg2) => arg1 + arg2;
      const hashFunc = (arg1, arg2) => `${arg1} plus ${arg2}`;
      const memoizedFunc = _.memoize(func, hashFunc);

      expect(memoizedFunc(5, 5)).to.equal(10);
      expect(memoizedFunc.cache['5 plus 5']).to.equal(10);
    });

    it('throws a TypeError when not given a valid function and called', () => {
      expect(function () { _.memoize()(); }).to.throw(TypeError);
      expect(function () { _.memoize([1, 2, 3])(); }).to.throw(TypeError);
      expect(function () { _.memoize(123)(); }).to.throw(TypeError);
      expect(function () { _.memoize('123')(); }).to.throw(TypeError);
      expect(function () { _.memoize(null)(); }).to.throw(TypeError);
    });

    it('defaults to built-in hash func using first argument when given invalid hashing function', () => {
      const func = (arg1, arg2) => arg1 + arg2;

      expect(function () { _.memoize(func, 123)(2, 2); }).to.throw(TypeError);
      expect(function () { _.memoize(func, '123')(2, 2); }).to.throw(TypeError);
      expect(function () { _.memoize(func, [123])(2, 2); }).to.throw(TypeError);
    });
  });

  describe('#delay', () => {
    it('should be a function', () => {
      expect(_.delay).to.be.a('function');
    });

    it('invokes the callback after a period of time', (done) => {
      let flag = false;
      _.delay(() => {
        flag = true;
        expect(flag).to.be.true;
        done();
      }, 200);
    });

    it('converts string-type delays into numbers', (done) => {
      let flag = false;
      _.delay(() => {
        flag = true;
        expect(flag).to.be.true;
        done();
      }, '100');
    });

    it('converts array-type delays into numbers', (done) => {
      let flag = false;
      _.delay(() => {
        flag = true;
        expect(flag).to.be.true;
        done();
      }, [100]);
    });

    it('passes arguments to the callback function', (done) => {
      const payLoad1 = ['foo', 'bar'];
      const payLoad2 = { A: 'B', C: 'D' };
      const payLoad3 = 3.14159;

      _.delay((...response) => {
        expect([...response]).to.eql([payLoad1, payLoad2, payLoad3]);
        done();
      }, 100, payLoad1, payLoad2, payLoad3);
    });
  });

  describe('#where', () => {
    it('should be a function', () => {
      expect(_.where).to.be.a('function');
    });

    it('returns a copy of the list filtered by the passed properties', () => {
      let list = [
        { isTrue: true },
        { isTrue: false },
        { isTrue: false }
      ];

      expect(_.where(list, { isTrue: true })).to.eql([{ isTrue: true }]);
      expect(_.where(list, { isTrue: false })).to.eql([{ isTrue: false }, { isTrue: false }]);
      expect(_.where(list, { isTrue: 'maybe' })).to.eql([]);

      list = [
        { title: 'Richard III', author: 'Shakespeare', year: 1592 },
        { title: 'The Comedy of Errors', author: 'Shakespeare', year: 1592 },
        { title: 'Titus Andronicus', author: 'Shakespeare', year: 1593 },
        { title: 'The Taming of the Shrew', author: 'Shakespeare', year: 1594 },
        { title: 'The Two Gentlemen of Verona', author: 'Shakespeare', year: 1595 }
      ];

      expect(_.where(list, { year: 1592 })).to.eql(list.slice(0, 2));
      expect(_.where(list, { title: 'Titus Andronicus' })).to.eql(list.slice(2, 3));
      expect(_.where(list, { author: 'Shakespeare' })).to.eql(list);
    });

    it('returns an empty array for invalid list inputs', () => {
      expect(_.where(['hello'], { e: 'e' })).to.eql([]);
      expect(_.where([[1], [2], [3]], { 1: 1 })).to.eql([]);
      expect(_.where(123, { 1: 1 })).to.eql([]);
      expect(_.where({ foo: 'bar' }, { 1: 1 })).to.eql([]);
    });

    it('returns the unfiltered list when given invalid properties object', () => {
      const list = [{ 0: true }, { foo: 'bar' }];

      expect(_.where(list, 'hello')).to.eql(list);
      expect(_.where(list, 123)).to.eql(list);
      expect(_.where(list, false)).to.eql(list);
      expect(_.where(list, true)).to.eql(list);
      expect(_.where(list, [])).to.eql(list);
    });

    it('returns the unfiltered list if passed an empty object as properties argument', () => {
      const list = [{ 0: 0 }, { 1: 1 }];
      expect(_.where(list, {})).to.eql(list);
    });
  });

  describe('#throttle', () => {
    it('should be a function', () => {
      expect(_.throttle).to.be.a('function');
    });

    it('returns a function', () => {
      expect(_.throttle()).to.be.a('function');
    });

    it('prevents repeated function calls until wait time has expired', () => {
      const testSpy = sinon.spy();
      const throttledFunc = _.throttle(testSpy, 50);
      throttledFunc();
      throttledFunc();
      throttledFunc();
      expect(testSpy.callCount).to.equal(1);
    });

    it('delays the intial call when passed optional argument', (done) => {
      const testSpy = sinon.spy();
      const throttledFunc = _.throttle(testSpy, 20, { leading: false });
      throttledFunc();

      expect(testSpy.called).to.be.false;

      _.delay(() => {
        expect(testSpy.callCount).to.equal(1);
        done();
      }, 40);
    });

    it('invokes the function immediately once the wait period has ended if it was called during the delay', (done) => {
      const testSpy = sinon.spy();
      const throttledFunc = _.throttle(testSpy, 20);
      throttledFunc();
      throttledFunc();
      expect(testSpy.callCount).to.equal(1);

      _.delay(() => {
        expect(testSpy.callCount).to.equal(2);
        done();
      }, 40);
    });

    it('does not follow the above behaviour if passed optional argument', (done) => {
      const testSpy = sinon.spy();
      const throttledFunc = _.throttle(testSpy, 20, { trailing: false });
      throttledFunc();
      throttledFunc();
      expect(testSpy.callCount).to.equal(1);

      _.delay(() => {
        expect(testSpy.callCount).to.equal(1);
        done();
      }, 40);
    });

    it('defaults to correct leading and trailing behaviours when given invalid option input', (done) => {
      const testSpy = sinon.spy();
      const throttledFunc = _.throttle(testSpy, 20, [true]);
      throttledFunc();
      throttledFunc();
      expect(testSpy.callCount).to.equal(1);

      _.delay(() => {
        expect(testSpy.callCount).to.equal(2);
        throttledFunc();
        expect(testSpy.callCount).to.equal(3);
        done();
      }, 60);
    });

    it('does not allow a third call to occur without wait', (done) => {
      const testSpy = sinon.spy();
      const throttledFunc = _.throttle(testSpy, 20);
      throttledFunc();
      throttledFunc();
      expect(testSpy.callCount).to.equal(1);

      _.delay(() => {
        expect(testSpy.callCount).to.equal(2);
        throttledFunc();
        expect(testSpy.callCount).to.equal(2);

        _.delay(() => {
          expect(testSpy.callCount).to.equal(3);
          done();
        }, 20);

      }, 30);
    });

    it('allows a maximum of one queued call', (done) => {
      const testSpy = sinon.spy();
      const throttledFunc = _.throttle(testSpy, 20);

      throttledFunc();
      throttledFunc();
      throttledFunc();
      throttledFunc();
      throttledFunc();

      expect(testSpy.callCount).to.equal(1);

      setTimeout(() => {
        expect(testSpy.callCount).to.equal(2);
        done();
      }, 200);
    });
  });

  describe('#partial', () => {
    it('should be a function', () => {
      expect(_.partial).to.be.a('function');
    });

    it('should return a function', () => {
      expect(_.partial()).to.be.a('function');
    });

    it('allows arguments to be passed to the wrapped function', () => {
      const add = (a, b) => a + b;
      const partialFunc = _.partial(add);

      expect(partialFunc(2, 2)).to.equal(4);
    });

    it('allows partial binding of arguments', () => {
      const add = (a, b) => a + b;
      const partialFunc = _.partial(add, 2);

      expect(partialFunc(2)).to.equal(4);
      expect(partialFunc(4)).to.equal(6);
    });

    it('allows for placeholder arguments', () => {
      const divide = (a, b) => a / b;
      let partialFunc = _.partial(divide, _, 2);

      expect(partialFunc(10)).to.equal(5);
      expect(partialFunc(50)).to.equal(25);

      const doMaths = (a, b, c, d) => ((a + b) * c) - d;
      partialFunc = _.partial(doMaths, _, _, 2, _);

      expect(partialFunc(1, 1, 4)).to.equal(0);
      expect(partialFunc(2, 8, 10)).to.equal(10);
    });

    it('does not alter context value', () => {
      let doMaths = function (a, b) {
        return (a - b) * this.multiplier;
      };

      const mathsObj = {
        multiplier: 10
      };

      doMaths = doMaths.bind(mathsObj);
      const partialFunc = _.partial(doMaths, _, 20);

      expect(partialFunc(60)).to.equal(400);
      expect(partialFunc(30)).to.equal(100);
    });

    it('throws a TypeError when invoked if given invalid input function', () => {
      expect(_.partial('hello')).to.be.a('function');
      expect(function () { _.partial('hello')(); }).to.throw(TypeError);
    });
  });
});
