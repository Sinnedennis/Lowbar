const _ = {};

_.identity = function (value) {
  return value;
};


_.values = function (object) {

  if (typeof object !== 'object' || object === null) return [];
  return Object.values(object);
};


_.first = function (list, n) {

  if (typeof list === 'string') list = list.split('');
  if (!Array.isArray(list)) return;

  if (!isNaN(n)) n = +n < 0 ? 0 : Math.floor(+n);
  else if (typeof n !== 'undefined') return [];

  return n === undefined ? list[0] : list.slice(0, n);
};


_.last = function (list, n) {

  if (typeof list === 'string') list = list.split('');
  if (!Array.isArray(list)) return;

  if (!isNaN(n)) n = +n < 0 ? 0 : Math.ceil(+n);
  else if (typeof n !== 'undefined') return list.slice();

  return n === undefined
    ? list[list.length - 1]
    : list.slice(list.length - n, list.length);
};


_.each = function (list, iteratee, context) {

  iteratee = iteratee.bind(context);

  if (Array.isArray(list) || typeof list === 'string') {

    for (let i = 0; i < list.length; i++) {
      iteratee(list[i], i, list);
    }
  } else if (typeof list === 'object' && list !== null) {
    for (let key in list) {
      iteratee(list[key], key, list);
    }
  }

  return list;
};


_.indexOf = function (array, value, isSorted = false) {

  if (typeof array === 'string') array = array.split('');

  if (!Array.isArray(array) || array.length === 0) return -1;
  if (typeof isSorted !== 'boolean' && typeof isSorted !== 'number') return -1;

  if (isSorted === false || typeof isSorted === 'number') {

    let startFrom = 0;
    if (typeof isSorted === 'number') {
      if (isSorted < 0 || isSorted > array.length) return -1;
      startFrom = isSorted;
    }

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


_.filter = function (list, predicate, context) {

  if (typeof predicate !== 'function') return [];
  predicate = predicate.bind(context);

  let result = [];

  _.each(list, (value, index, list) => {
    if (predicate(value, index, list)) result.push(value);
  }, context);

  return result;
};


_.reject = function (list, predicate, context) {
  return _.filter(list, _.negate(predicate), context);
};


_.uniq = function (array, isSorted, iteratee) {

  if (typeof array === 'string' && array.length > 0) array = array.split('');
  if (typeof isSorted !== 'boolean') isSorted = false;
  if (typeof iteratee !== 'function') iteratee = _.identity;

  if (!Array.isArray(array)) return [];

  const result = [];

  _.each(array, (value, i) => {
    iteratee(value, i, array);
    if (_.indexOf(result, value, isSorted) === -1) result.push(value);
  });

  return result;
};


_.map = function (list, iteratee, context) {

  if (typeof iteratee !== 'function') return [];

  iteratee = iteratee.bind(context);
  const mappedArr = [];

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


_.reduce = function (list, iteratee, memo, context) {

  if (typeof list !== 'object' && !Array.isArray(list) && typeof list !== 'string') return;
  iteratee = iteratee.bind(context);

  _.each(list, (value, i, list) => {
    if (memo === undefined) memo = value;
    else memo = iteratee(memo, value, i, list);
  }, context);

  return memo;
};


_.every = function (list, predicate, context) {

  if (Array.isArray(list)) list = list.slice();
  else if (typeof list === 'object' && list !== null) list = _.values(list);
  else if (typeof list === 'string') list = list.split('');
  else return true;

  if (typeof predicate !== 'function') return false;
  predicate = predicate.bind(context);

  for (let i = 0; i < list.length; i++) {
    if (!predicate(list[i])) return false;
  }

  return true;
};


_.some = function (list, predicate, context) {

  if (Array.isArray(list)) list = list.slice();
  else if (typeof list === 'object' && list !== null) list = _.values(list);
  else if (typeof list === 'string') list = list.split('');
  else return false;

  if (typeof predicate !== 'function') return false;
  predicate = predicate.bind(context);

  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i])) return true;
  }

  return false;
};


_.extend = function (destination, ...sources) {

  if (typeof destination === 'object' && destination !== null) {
    return Object.assign(destination, ...sources);
  }

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
  if (typeof list !== 'object' && typeof list !== 'string' || list === null) return [];

  const args = [].slice.call(arguments, 2);

  return _.map(list, function (item) {
    if (item[methodName] === undefined) return undefined;
    return item[methodName].apply(item, args);
  });
};

_.sortBy = function (list, iteratee, context) {

  if (typeof list !== 'object' && typeof list !== 'string' || list === null) return [];
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

_.zip = function () {

  const inputArrays = [].slice.apply(arguments);
  const zippedArray = [];
  const longestArr = _.sortBy(inputArrays, 'length').slice(-1)[0].length;

  _.each(inputArrays, (array) => {
    for (let i = 0; i < longestArr; i++) {
      if (zippedArray[i] === undefined) zippedArray[i] = [array[i]];
      else zippedArray[i].push(array[i]);
    }
  });

  return zippedArray;
};

//Needs refactor
_.sortedIndex = function (list, value, iteratee, context) {

  if (Array.isArray(list)) list = list.slice();
  else if (typeof list === 'string') list = list.split('');
  else return 0;

  if (iteratee) {

    const isValidValue = _.every(list, (listValue) => {
      return typeof listValue === typeof value;
    });
    if (!isValidValue) return 0;

    _.sortBy(list, iteratee, context);

    if (typeof iteratee === 'string') {
      list = _.map(list, item => item[iteratee]);
      value = value[iteratee];
    }
    else if (typeof iteratee === 'function') {
      iteratee = iteratee.bind(context);
      list = _.map(list, item => iteratee(item));
      value = iteratee(value);
    } else return 0;

    let mid,
      min = 0,
      max = list.length - 1;

    while (min <= max) {
      mid = Math.floor((min + max) / 2);
      if (mid === 0 && list[mid] > value) {
        return mid;
      }
      else if (mid === list.length - 1 && list[mid] < value) {
        return mid + 1;
      }

      else if (list[mid] < value && list[mid + 1] >= value) {
        return mid + 1;
      }
      else if (list[mid] < value) min = mid + 1;

      else max = mid - 1;

    }
    return 0;
  }

  list.push(value);
  list.sort();

  return _.indexOf(list, value, true);
};

_.flatten = function (array, shallow = false) {
  if (!Array.isArray(array) && typeof array !== 'string') return [];

  return _.reduce(array, (memo, value) => {
    if (!shallow && Array.isArray(value)) value = _.flatten(value);
    return memo.concat(value);
  }, []);
};

_.intersection = function (...arrays) {

  if (arguments.length === 1 && typeof arguments[0] === 'string') return _.uniq(arguments[0].split(''));

  const isValidValue = _.every([...arrays], (array) => {
    return Array.isArray(array);
  });
  if (!isValidValue) return [];

  const input = _.flatten([...arrays], true);
  const inputCopy = input.slice();
  const unique = [];

  const common = _.reduce(inputCopy, (memo, value) => {
    unique.push(input.shift());
    if (_.contains(input, value)) memo.push(value);
    return memo;

  }, []);

  return _.uniq(common);
};

_.difference = function (array, ...otherArrays) {

  if (typeof array === 'string') array = array.split('');
  else if (typeof array === 'object' && !Array.isArray(array)) array = _.values(array);

  const flatArrays = _.flatten([...otherArrays], true);

  return _.reject(array, (value) => {
    return _.contains(flatArrays, value);
  });
};

_.memoize = function (func, hashFunc) {

  if (!hashFunc) hashFunc = function () { return arguments[0]; };

  const memoizedFunc = function () {

    const key = hashFunc.apply(null, arguments);

    if (memoizedFunc.cache[key]) return memoizedFunc.cache[key];

    const result = func.apply(null, arguments);
    memoizedFunc.cache[key] = result;

    return result;
  };

  memoizedFunc.cache = {};
  return memoizedFunc;
};

_.delay = function (func, wait, ...args) {

  if (!isNaN(wait)) wait = +wait;
  if (typeof wait !== 'number' || wait < 0) wait = 0;

  return setTimeout(func, wait, ...args);
};

_.where = function (list, properties) {

  if (!Array.isArray(list)) return [];
  if (typeof properties !== 'object' || Array.isArray(properties)) return list;

  return _.filter(list, (item) => {

    let keepItem = true;

    _.each(properties, (propVal, index) => {
      if (propVal !== item[index]) keepItem = false;
    });

    return keepItem;
  });
};


/*
  makes note of time when intialised
  returns a function that, when called, returns an _.delay with the appropriate wait time
*/

_.throttle = function (func, wait, options = { leading: true, trailing: true }) {

  options.leading = options.leading === false ? false : true;
  options.trailing = options.trailing === false ? false : true;

  let beenCalled = false;
  let toBeCalled = false;

  const throttledFunc = function (...args) {

    if (beenCalled === false) {
      beenCalled = true;

      if (options.leading) func.apply(null, ...args);
      else toBeCalled = true;

      const waitLoop = function () {
        _.delay(() => {

          if (toBeCalled) {
            toBeCalled = false;
            func.apply(null, ...args);
            waitLoop();
          } else beenCalled = false;

        }, wait);
      };

      waitLoop();

    } else if (options.trailing) toBeCalled = true;

  };
  return throttledFunc;
};

_.partial = function (func, ...partialArgs) {

  return function (...newArgs) {

    const mappedArgs = _.map(partialArgs, (arg) => {
      return arg === _ ? newArgs.shift() : arg;
    });

    return func(...mappedArgs, ...newArgs);
  };
};

module.exports = _;