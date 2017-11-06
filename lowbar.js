const _ = {};

_.identity = function (value) {
  return value;
};

//Refactor to not use ES6 ?
_.values = function (object) {
  if (typeof object !== 'object') return [];
  return Object.values(object);
};

_.first = function (array, n) {
  if (!Array.isArray(array) && typeof array !== 'string') return;
  if (typeof array === 'string') return n === undefined ? array[0] : array.split('').slice(0, n);
  return n === undefined ? array[0] : array.slice(0, n);
};

_.last = function (array, n) {
  if (!Array.isArray(array) && typeof array !== 'string') return;
  if (typeof array === 'string') return n === undefined ? array[array.length - 1] : array.split('').slice(array.length - n, array.length);
  return n === undefined ? array[array.length - 1] : array.slice(array.length - n, array.length);
};

_.each = function (list, iteratee, context = this) {

  iteratee = iteratee.bind(context);

  if (Array.isArray(list) || typeof list === 'string') {

    for (let i = 0; i < list.length; i++) {
      iteratee(list[i], i, list);
    }
  } else if (typeof list === 'object') {

    for (let key in list) {
      iteratee(list[key], key, list);
    }
  }

  return list;
};

//Fix binary search
_.indexOf = function (array, value, isSorted = false) {

  if (isSorted === false || typeof isSorted === 'number') {

    const startFrom = typeof isSorted === 'number' ? isSorted : 0;

    for (let i = startFrom; i < array.length; i++) {
      if (array[i] === value) return i;
    }
    return -1;

  } else {
    let start = 0;
    let end = array.length - 1;
    let mid;
    while (end >= start) {
      mid = Math.floor((start + end) / 2);
      if (array[mid] === value) {
        return mid;
      }
      else if (array[mid] < value) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
  }
  return -1;
};

_.filter = function (list, predicate, context = this) {
  let results = [];

  _.each(list, (value, index, list) => {
    if (predicate(value, index, list)) results.push(value);
  }, context);

  return results;
};

//Can refactor with negate in Advanced Lowbar later
_.reject = function (list, predicate, context = this) {
  let results = [];

  _.each(list, (value, index, list) => {
    if (!predicate(value, index, list)) results.push(value);
  }, context);
  return results;
};

//Refactor to use === item comparison
//Underscore passes EVERY item to the iteratee - why?
//Underscore produces some really weird results...
_.uniq = function (array, isSorted = false, iteratee) {
  let result = [];

  for (let i = 0; i < array.length; i++) {
    if (iteratee !== undefined) iteratee(array[i], i, array);
    if (_.indexOf(result, array[i], isSorted) === -1) result.push(array[i]);
  }

  return result;
};

_.map = function (list, iteratee, context = this) {
  let mappedArr = [];
  iteratee = iteratee.bind(context);

  for (let i = 0; i < list.length; i++) {
    mappedArr[i] = iteratee(list[i], i, list);
  }

  return mappedArr;
};

_.contains = function (list, value, fromIndex = 0) {
  return _.indexOf(list, value, fromIndex) > -1 ? true : false;
};

_.pluck = function (list, propName) {
  return _.map(list, item => {
    return item[propName];
  });
};

_.reduce = function (list, iteratee, memo, context = this) {

  iteratee = iteratee.bind(this);

  if (memo === undefined) memo = list.splice(0, 1)[0];

  _.each(list, (value, i, list) => {
    memo = iteratee(memo, value, i, list);
  }, context);

  return memo;
};

_.every = function (list, predicate, context) {

  predicate = predicate.bind(context);

  for (let i = 0; i < list.length; i++) {
    if (!predicate(list[i])) return false;
  }

  return true;
};

_.some = function (list, predicate, context) {

  predicate = predicate.bind(context);

  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i])) return true;
  }

  return false;
};

//Double-check that arguments are processed in order
_.extend = function (destination) {

  _.each(arguments, (arg) => {
    _.reduce(arg, (memo, value, i) => {
      return memo[i] = value;
    }, destination);
  });

  return destination;
};

_.defaults = function (object) {
  _.each(arguments, (arg) => {
    _.reduce(arg, (memo, value, i) => {

      if (!memo.hasOwnProperty(i)) {
        return memo[i] = value;
      }
      return memo;

    }, object);
  });

  return object;
};

_.once = function (func) {
  let called = false;
  let result;

  return function () {
    if (called === false) {
      called = true;
      result = func.apply(null, arguments);
    }
    return result;
  };
};

_.negate = function (predicate) {

  return function () {
    return !predicate.apply(null, arguments);
  };
};

module.exports = _;