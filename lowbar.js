const _ = {};

_.identity = function (value) {
  return value;
};

//Refactor to not use ES6 ?
_.values = function (object) {

  if (typeof object !== 'object' || object === null) return [];
  return Object.values(object);
};

_.first = function (list, n) {

  if (!Array.isArray(list) && typeof list !== 'string') return;
  if (n !== undefined && typeof n !== 'number') return [];
  
  if (n < 0) n = 0;

  if (typeof list === 'string') {
    return n === undefined ? list[0] : list.split('').slice(0, n);
  }

  return n === undefined ? list[0] : list.slice(0, n);
};

_.last = function (list, n) {

  if (!Array.isArray(list) && typeof list !== 'string') return;
  if (n !== undefined && typeof n !== 'number') return [];

  if (typeof list === 'string') {
    return n === undefined
      ? list[list.length - 1]
      : list.split('').slice(list.length - n, list.length);
  }

  return n === undefined
    ? list[list.length - 1]
    : list.slice(list.length - n, list.length);
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

  _.each(list, (value, index, list) => {
    mappedArr.push(iteratee(value, index, list));
  }, context);

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

_.shuffle = function (list) {

  if (Array.isArray(list)) list = list.slice();
  else if (typeof list === 'string') list = list.split('');
  else if (typeof list === 'object' && list !== null) list = _.values(list);
  else return [];

  let result = [];
  let rand;
  const length = list.length;

  for (let i = 0; i < length; i++) {
    rand = Math.floor(Math.random() * (list.length - 1));

    result.push(list[rand]);

    list[rand] = list.pop();
  }
  return result;
};

_.invoke = function (list, methodName) {
  if (typeof list !== 'object' && typeof list !== 'string') return [];

  const args = [].slice.call(arguments, 2);

  return _.map(list, function (item) {
    if (item[methodName] === undefined) return undefined;
    return item[methodName].apply(item, args);
  });
};

/*
Returns a (stably) sorted copy of list, ranked in ascending order
by the results of running each value through iteratee.
iteratee may also be the string name of the property to 
sort by (eg. length). 

*/

_.sortBy = function (list, iteratee, context) {

  // if (typeof list !== 'object' && typeof list !== 'string') return [];
  list = list.slice();

  if (iteratee === undefined) return list.sort();

  else if (typeof iteratee === 'function') {
    iteratee = iteratee.bind(context);

    return list.sort((a, b) => {
      return iteratee(a) - iteratee(b);
    });

  } else if (typeof iteratee === 'string') {

    return list.sort((a, b) => {
      return a[iteratee] - b[iteratee];
    });
  }

  return [];
};

module.exports = _;