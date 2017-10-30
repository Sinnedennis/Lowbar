const _ = {};

_.identity = function (value) {
  return value;
};

_.values = function (object) {
  if (typeof object !== 'object') return null;
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

_.indexOf = function (array, value, isSorted = false) {

  if (!isSorted) {

    for (let i = 0; i < array.length; i++) {
      if (array[i] === value) return i;
    }
    return -1;

  } else {

    if (array.length === 1) return 0;
    let mid = Math.floor(array.length / 2);

    if (value < array[mid]) return _.indexOf(array.slice(0, mid), value, true);
    else return mid + _.indexOf(array.slice(mid), value, true);
  }
};

module.exports = _;