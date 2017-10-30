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

module.exports = _;