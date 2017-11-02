const _ = {};

_.identity = function (value) {
  return value;
};

//Refactor to not use ES6
_.values = function (object) {
  if (typeof object !== 'object') return [];
  return Object.values(object);
};

_.first = function (array, n) {
  if (!Array.isArray(array)) return null;
  return n === undefined ? array[0] : array.slice(0, n);
};

_.last = function (array, n) {
  if (!Array.isArray(array)) return null;
  return n === undefined ? array[array.length - 1] : array.slice(array.length - n, array.length);
};

_.each = function (list, iteratee, context = this) {

  iteratee.bind(context);

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

  } else if (isSorted === true) {

    if (array.length <= 1) return -1;
    let mid = Math.floor(array.length / 2);
    if (value < array[mid]) return _.indexOf(array.slice(0, mid), value, true);
    else return mid + _.indexOf(array.slice(mid), value, true);
  }
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
_.uniq = function (array, isSorted = false, iteratee) {
  let result = [];

  if (!isSorted) {

    for (let i = 0; i < array.length; i++) {
      if (_.indexOf(result, array[i], false) === -1) result.push(array[i]);
    }

    if (iteratee !== undefined) {
      for (let i = 0; i < result.length; i++) {
        result[i] = iteratee(result[i]);
      }
    }
    return result;
  } else {
    //Is a binary search needed?
  }
};

_.map = function (list, iteratee, context = this) {
  let mappedArr = [];
  iteratee.bind(context);

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

  iteratee.bind(this);

  if (memo === undefined) memo = list.splice(0, 1)[0];

  _.each(list, (value, i, list) => {
    memo = iteratee(memo, value, i, list);
  }, context);

  return memo;
};

_.every = function (list, predicate, context) {
  
  predicate.bind(context);

  for(let i = 0; i < list.length; i++) {
    if (!predicate(list[i])) return false;
  }
  return true;
};

module.exports = _;