const _ = {};

_.identity = function (value) {
  return value;
};

_.values = function (object) {
  if (typeof object !== 'object') return null;
  return Object.values(object);
};

module.exports = _;