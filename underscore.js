const _ = require('underscore');

const pluck = _.pluck([{foo: 'bar'}, {foo: 'bar'}], 'hello');
console.log(pluck);

