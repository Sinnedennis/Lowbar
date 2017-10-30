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

module.exports = _;