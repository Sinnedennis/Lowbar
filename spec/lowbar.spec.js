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
      let value = 'foo';
      expect(_.identity(value)).to.equal(value);

      value = [10];
      expect(_.identity(value)).to.equal(value);
      expect(_.identity(value)).to.eql(value);

      value = { foo: 'bar' };
      expect(_.identity(value)).to.equal(value);
      expect(_.identity(value)).to.eql(value);
    });
  });

  describe('#values', () => {

    it('is a function', () => {
      expect(_.values).to.be.a('function');
    });

    it('returns the values of an object', () => {
      const inputObj = { one: 10, two: 'hello', three: true };
      expect(_.values(inputObj)).to.eql([10, 'hello', true]);
    });

    it('returns a shallow copy of an array', () => {
      const inputObj = ['h', [1], [1, 2, 3]];
      expect(_.values(inputObj)).to.eql(['h', [1], [1, 2, 3]]);
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

  //Guard against decimal n's?
  describe('#first', () => {

    it('is a function', () => {
      expect(_.first).to.be.a('function');
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
      expect(_.first(inputArr, 99)).to.eql([0, 1, 2, 3]);
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

    it('returns undefined for invalid inputs', () => {
      expect(_.first(true)).to.equal(undefined);
      expect(_.first(null)).to.equal(undefined);
      expect(_.first({ 1: 1, 2: 2, 3: 3 })).to.equal(undefined);
      expect(_.first(31415)).to.equal(undefined);
    });

    //true and false function as 1 and 0
    it('returns an empty array for invalid n inputs', () => {
      expect(_.first([1], NaN)).to.eql([]);
      expect(_.first([1], 'a')).to.eql([]);
      expect(_.first([1], false)).to.eql([]);
      expect(_.first([1], [1, 2, 3])).to.eql([]);
    });
  });

  //Guard against decimal n's?
  describe('#last', () => {

    it('is a function', () => {
      expect(_.last).to.be.a('function');
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

    it('returns undefined for invalid list inputs', () => {
      expect(_.last(true)).to.eql(undefined);
      expect(_.last(null)).to.eql(undefined);
      expect(_.last({ 1: 1, 2: 2, 3: 3 })).to.eql(undefined);
      expect(_.last(31415)).to.eql(undefined);
    });

    //true and false function as 1 and 0
    //underscore.js returns whole array?
    it('returns an empty array for invalid n inputs', () => {
      // expect(_.last([1], NaN)).to.eql([]);
      // expect(_.last([1], 'a')).to.eql([]);
      // expect(_.last([1], [1, 2, 3])).to.eql([]);
      expect(_.last([1], false)).to.eql([]);
    });
  });

  //Test context
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
      _.each(['foo', 'bar'], testSpy);

      expect(testSpy.args[0]).to.eql(
        ['foo', 0, ['foo', 'bar']]
      );
      expect(testSpy.args[1]).to.eql(
        ['bar', 1, ['foo', 'bar']]
      );

      testSpy.reset();
      _.each({ foo: 'bar', hello: 'world' }, testSpy);

      expect(testSpy.args).to.eql([
        ['bar', 'foo', { foo: 'bar', hello: 'world' }],
        ['world', 'hello', { foo: 'bar', hello: 'world' }]
      ]);
    });

    it('works for strings', () => {
      const testSpy = sinon.spy();
      _.each('123', testSpy);

      expect(testSpy.callCount).to.equal(3);

      expect(testSpy.args).to.eql([
        ['1', 0, '123'],
        ['2', 1, '123'],
        ['3', 2, '123']
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

    it('returns the list if given invalid input', () => {
      expect(_.each(1, NaN, 'that')).to.equal(1);
      expect(_.each('list', false, 1337)).to.equal('list');
      expect(_.each(null, undefined, true)).to.equal(null);
      expect(_.each(undefined, NaN, 'that')).to.equal(undefined);
    });
  });

  //How to test if binary search is faster than unsorted
  describe('#indexOf', () => {
    it('is a function', () => {
      expect(_.indexOf).to.be.a('function');
    });

    it('returns index of value in unsorted arr', () => {
      const inputArr = ['a', 'b', 'c'];
      expect(_.indexOf(inputArr, 'a')).to.equal(0);
      expect(_.indexOf(inputArr, 'b')).to.equal(1);
      expect(_.indexOf(inputArr, 'c')).to.equal(2);
    });

    it('returns -1 if array does not contain value', () => {
      const inputArr = ['a', 'b', 'c'];
      expect(_.indexOf(inputArr, 'aa')).to.equal(-1);
      expect(_.indexOf(inputArr, 1)).to.equal(-1);
      expect(_.indexOf(inputArr, 'true')).to.equal(-1);
    });

    it('returns -1 if given invalid input', () => {
      expect(_.indexOf()).to.equal(-1);
      expect(_.indexOf(1, 2, 3)).to.equal(-1);
      expect(_.indexOf([], NaN, NaN)).to.equal(-1);
    });

    it('works for strings', () => {
      expect(_.indexOf('hello', 'h')).to.equal(0);
      expect(_.indexOf('hello', 'l')).to.equal(2);
      expect(_.indexOf('hello', 'o')).to.equal(4);
      expect(_.indexOf('hello', 'x')).to.equal(-1);
    });

    it('returns index via binary search of value in a sorted arr', () => {
      const inputArr = [1, 2, 3, 4, 5];
      expect(_.indexOf(inputArr, 2, true)).to.equal(1);
      expect(_.indexOf(inputArr, 5, true)).to.equal(4);
      expect(_.indexOf(inputArr, 'hi', true)).to.equal(-1);
    });

    it('starts searching at i if given number as third argument', () => {
      const inputArr = [1, 2, 3, 4, 5];
      expect(_.indexOf(inputArr, 1, 2)).to.equal(-1);
      expect(_.indexOf(inputArr, 5, 1)).to.equal(4);
      expect(_.indexOf(inputArr, 4, 1)).to.equal(3);
    });
  });

  describe('#filter', () => {
    it('is a function', () => {
      expect(_.filter).to.be.a('function');
    });

    it('passes every list item to the predicate', () => {
      let inputArr = [0, 1, 2, 3, 4, 5];
      let testSpy = sinon.spy();
      _.filter(inputArr, testSpy);
      expect(testSpy.callCount).to.equal(inputArr.length);

      inputArr = [0, 1, 2, 3];
      testSpy.reset();
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

    it('works for objects', () => {
      const testSpy = sinon.spy();
      let inputObj = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 };

      _.filter(inputObj, testSpy);
      expect(testSpy.callCount).to.eql(Object.keys(inputObj).length);

      let predicate = (num) => num > 2;
      expect(_.filter(inputObj, predicate)).to.eql([3, 4, 5]);
    });

    it('takes a context argument for arrays', () => {
      const predicateObj = {
        predicate: item => item > 2,
      };

      const result = _.filter([0, 1, 2, 3, 4, 5], function (item) {
        return this.predicate(item);
      }, predicateObj);

      expect(result).to.eql([3, 4, 5]);

    });

    it('takes a context argument for objects', () => {
      const predicateObj = {
        predicate: item => item > 2,
      };

      const result = _.filter({ 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 }, function (item) {
        return this.predicate(item);
      }, predicateObj);

      expect(result).to.eql([3, 4, 5]);

    });

    it('returns list if given invalid inputs', () => {
      expect(_.filter([], () => { })).to.eql([]);
      expect(_.filter(1, NaN, false)).to.eql(1);
      expect(_.filter('five', null, undefined)).to.eql('five');
      expect(_.filter({}, 1, 2)).to.eql({});
    });
  });

  describe('#reject', () => {
    it('is a function', () => {
      expect(_.reject).to.be.a('function');
    });

    it('passes every list item to the predicate', () => {
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

      predicate = (char) => char === 'hi';
      expect(_.reject(inputObj, predicate)).to.eql(_.values(inputObj));
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
      const testArr = [1, 2, 2, 2, 3, 3];
      expect(_.uniq(testArr, true)).to.eql([1, 2, 3]);

    });

    it('returns empty array when given invalid array input', () => {
      expect(_.uniq(1)).to.eql([]);
      expect(_.uniq({ 1: 1, 2: 2 })).to.eql([]);
      expect(_.uniq(null)).to.eql([]);
      expect(_.uniq([])).to.eql([]);
    });

    it('Functions normally if given invalid optional inputs (isSorted & iteratee)', () => {
      expect(_.uniq('foo', 1, NaN)).to.eql(['f', 'o']);
      expect(_.uniq('foo', 'true', 'function')).to.eql(['f', 'o']);
      expect(_.uniq('foo', null, 10)).to.eql(['f', 'o']);
    });
  });

  describe.only('#map', () => {
    it('is a function', () => {
      expect(_.map).to.be.a('function');
    });

    it('yields each item to the iteratee', () => {
      const testSpy = sinon.spy();
      const testArr = [1, 2, 3];

      _.map(testArr, testSpy);

      expect(testSpy.callCount).to.equal(testArr.length);
    });

    it('passes the following arguments in order to the iteratee - value, index/key, list', () => {
      const testSpy = sinon.spy();
      const testArr = [1, 2, 3];

      _.map(testArr, testSpy);

      expect(testSpy.args).to.eql([
        [1, 0, testArr],
        [2, 1, testArr],
        [3, 2, testArr]
      ]);
    });

    it('returns a new transformed array without mutating the original input', () => {
      const testArr = [1, 2, 3];

      const result = _.map(testArr, (item) => {
        return item * 10;
      });

      expect(result).to.eql([10, 20, 30]);
      expect(testArr).to.eql([1, 2, 3]);
    });

    it('works for objects', () => {
      const inputObj = {0: 'a', 1: 'b', 2: 'c'};

      const result = _.map(inputObj, (char) => {
        return char.toUpperCase();
      });

      expect(result).to.eql(['A', 'B', 'C']);
    });

    it('works for strings', () => {
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
        { foo: 'bar' },
        { foo: 'bar' }
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

  describe('#every', () => {
    it('should be a function', () => {
      expect(_.every).to.be.a('function');
    });
    it('returns true if every list item passes the predicate', () => {
      const arr = [1, 2, 3, 4, 5];
      const predicate = num => num < 10;
      expect(_.every(arr, predicate)).to.be.true;
    });
    it('returns false if one of the items fails the predicate', () => {
      const arr = [1, 2, 3, 4, 5];
      const predicate = num => num < 5;
      expect(_.every(arr, predicate)).to.be.false;
    });
    it('short-circuits if one item fails', () => {
      const arr = [1, 20, 3, 2, 1, 0];
      const predicate = num => num < 5;

      const testSpy = sinon.spy(predicate);
      _.every(arr, testSpy);

      expect(testSpy.calledTwice).to.be.true;
    });
  });

  describe('#some', () => {
    it('should be a function', () => {
      expect(_.some).to.be.a('function');
    });
    it('returns true if some of the values in the list pass the predicate', () => {
      const arr = [0, 1, 2, 3, 4, 5];
      const predicate = num => num === 3;
      expect(_.some(arr, predicate)).to.be.true;
    });
    it('returns false if nonde of the values in the list pass the predicate', () => {
      const arr = [0, 1, 2, 3, 4, 5];
      const predicate = num => num === 'foo';
      expect(_.some(arr, predicate)).to.be.false;
    });
    it('short-circuits of one item passes', () => {
      const arr = [1, 'foo', 3, 2, 1, 0];
      const predicate = num => num === 'foo';

      const testSpy = sinon.spy(predicate);
      _.some(arr, testSpy);
      expect(testSpy.calledTwice).to.be.true;
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
    it('runs in-order, so the last source will override properties of the same name in previous arguments', () => {
      const destination = { hello: 'world' };
      const copy = _.extend(destination, { foo: 'sushi' }, { foo: 'bar' });
      expect(copy.foo).to.equal('bar');
    });
  });

  describe('#defaults', () => {
    it('should be a function', () => {
      expect(_.defaults).to.be.a('function');
    });
    it('fills in undefined properties in the object with the default list', () => {
      const object = { foo: 'bar' };
      const defaults = { foo: 'ice-cream', yes: 'no' };
      expect(_.defaults(object, defaults)).to.eql({ foo: 'bar', yes: 'no' });
    });
    it('uses the first value present in the default lists', () => {
      const object = { foo: 'bar' };
      expect(_.defaults(object,
        { foo: 'ice-cream' },
        { yes: 'no' },
        { yes: 'maybe' })).to.eql({ foo: 'bar', yes: 'no' });
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
      expect(wrappedFunc(true)).to.not.equal('twice');
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
      const list = ['not', 'foobar'];
      const predicate = string => string === 'foobar';
      const negatedPred = _.negate(predicate);
      const result = _.filter(list, negatedPred);
      expect(result).to.eql(['not']);
    });
  });
  //Requires better testing
  describe('#shuffle', () => {
    it('should be a function', () => {
      expect(_.shuffle).to.be.a('function');
    });
    it('returns a randomly-shuffled array', () => {
      let arr = [0, 1, 2, 3, 4, 5];
      let shuffled = _.shuffle(arr);

      expect(_.contains(shuffled, undefined)).to.be.false;

      for (let i = 0; i < arr.length; i++) {
        expect(_.contains(arr, arr[i])).to.be.true;
      }

      const shuffledSum = _.reduce(shuffled, (memo, value) => memo + value, 0);
      const unshuffledSum = _.reduce(arr, (memo, value) => memo + value, 0);
      expect(unshuffledSum).to.equal(shuffledSum);

      expect(arr.length).to.equal(shuffled.length);
    });
    it('works for objects', () => {
      let obj = {
        a: 0,
        b: 1,
        c: 2,
        d: 3,
        e: 4,
        f: 5
      };

      let shuffledObj = _.shuffle(obj);

      for (let key in obj) {
        expect(_.contains(shuffledObj, obj[key])).to.be.true;
      }

      const shuffledSum = _.reduce(shuffledObj, (memo, value) => memo + value, 0);
      const unshuffledSum = _.reduce(obj, (memo, value) => memo + value, 0);
      expect(unshuffledSum).to.equal(shuffledSum);

      expect(shuffledObj.length).to.equal(_.values(obj).length);

    });
    it('works for strings', () => {
      let str = '012345';
      let shuffledStr = _.shuffle(str);

      for (let i = 0; i < str.length; i++) {
        expect(_.contains(shuffledStr, str[i])).to.be.true;
      }

      expect(str.length).to.equal(shuffledStr.length);
    });
  });
  describe('#invoke', () => {
    it('should be a function', () => {
      expect(_.invoke).to.be.a('function');
    });
    it('applies an array method on each array value in an array list', () => {
      expect(_.invoke([[2, 4, 1, 3], [4, 6, 5, 7]], 'sort'))
        .to.eql([[1, 2, 3, 4], [4, 5, 6, 7]]);

      expect(_.invoke([[2, 4, 1, 3], [4, 6, 5, 7]], 'join'))
        .to.eql(['2,4,1,3', '4,6,5,7']);
    });
    it('passes any additional arguments to the array method', () => {
      expect(_.invoke([[2, 4, 1, 3], [4, 6, 5, 7]], 'join', '+'))
        .to.eql(['2+4+1+3', '4+6+5+7']);
    });
    it('works for objects', () => {
      expect(_.invoke({ x: 'a', y: 'b', z: 'c' }, 'toUpperCase'))
        .to.eql(['A', 'B', 'C']);
    });
    it('works for strings', () => {
      expect(_.invoke('foo', 'toUpperCase'))
        .to.eql(['F', 'O', 'O']);
    });
    it('returns undefined if no method is given', () => {
      expect(_.invoke([1, 2, 3])).to.eql([undefined, undefined, undefined]);
    });

    it('returns undefined per-item if a inapppropriate method is given', () => {
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
      const arr = [0, 1, 2, 3, 4, 5];
      expect(_.sortBy(arr)).to.not.equal(arr);
    });
    it('returns an array in acending order if passed no iteratee', () => {
      expect(_.sortBy([5, 3, 4, 0, 1, 2])).to.eql([0, 1, 2, 3, 4, 5]);
      expect(_.sortBy(['a', 'c', 'b'])).to.eql(['a', 'b', 'c']);
    });
    it('returns an array sorted by iteratee in acending order', () => {
      const arr = ['eggman', 'the', 'am', 'i'];
      const func = x => x.length;
      expect(_.sortBy(arr, func)).to.eql(['i', 'am', 'the', 'eggman']);
    });
    it('sorts arrays of objects via a passed property in acending order', () => {
      const arr = [
        { name: 'Dave', age: 53 },
        { name: 'Olie', age: 26 },
        { name: 'Holly', age: 42 }
      ];

      const answer = [
        { name: 'Olie', age: 26 },
        { name: 'Holly', age: 42 },
        { name: 'Dave', age: 53 }
      ];
      expect(_.sortBy(arr, 'age')).to.eql(answer);
    });
  });
});
