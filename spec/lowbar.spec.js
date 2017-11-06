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
      expect(_.identity(value)).to.eql(value);
      value = [10];
      expect(_.identity(value)).to.eql(value);
      value = { foo: 'bar' };
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
      expect(_.values(true)).to.eql([]);
      expect(_.values()).to.eql([]);
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
    it('works for strings', () => {
      expect(_.first('hello')).to.equal('h');
      expect(_.first('hello', 2)).to.eql(['h', 'e']);
      expect(_.first('hello', 100)).to.eql(['h', 'e', 'l', 'l', 'o']);
    });
    it('returns [] for non-arrays', () => {
      expect(_.first(true)).to.equal(undefined);
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
    it('works with strings', () => {
      expect(_.last('foobar')).to.equal('r');
      expect(_.last('foobar', 2)).to.eql(['a', 'r']);
      expect(_.last('foobar', 100)).to.eql(['f', 'o', 'o', 'b', 'a', 'r']);
    });
    it('returns null for non-arrays', () => {
      expect(_.last(true)).to.equal(undefined);
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
    it('returns index via binary search of value a sorted arr', () => {
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
      let testArr = [1, '2', 1, 'three'];
      expect(_.uniq(testArr, false)).to.eql([1, '2', 'three']);
      testArr = [null, undefined, null, undefined];
      expect(_.uniq(testArr, false)).to.eql([null, undefined]);
    });
    it('yeilds EVERY item to an interatee, regardless of being uniq or not', () => {
      const testArr = [1, 2, 3, 2, 3];
      let testSpy = sinon.spy();
      _.uniq(testArr, false, testSpy);
      expect(testSpy.callCount).to.equal(testArr.length);

      it('passes the array item, the iteration number, and the list to the iteratee', () => {
        expect(testSpy.args[0][0]).to.equal(testArr[0]);
        expect(testSpy.args[4][0]).to.equal(testArr[4]);

        expect(testSpy.args[0][1]).to.equal(0);
        expect(testSpy.args[4][1]).to.equal(testArr.length - 1);

        expect(testSpy.args[0][2]).to.eql(testArr);
      });

      //_ only returns first item in arr when given an iteratee
      let iteratedArr = [];
      const iteratee = (item) => { return iteratedArr.push(item + 'foo'); };
      _.uniq([1, 2, 1, 3], false, iteratee);
      expect(iteratedArr).to.eql(['1foo', '2foo', '1foo', '3foo']);
    });
    it('filters array via faster binary search', () => {
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
  describe.only('#invoke', () => {
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

      expect(_.invoke({a: 'a', b: 'b'}, 'sort'))
        .to.eql([undefined, undefined]);

      expect(_.invoke([[3,1,2], 'foo', [5,4,6]], 'sort'))
        .to.eql([[1,2,3], undefined, [4,5,6]]);
    });
  });
});
