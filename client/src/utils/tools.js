export const deepCopy = (obj) => {
  let newObj = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === 'object') {
    for (var key in obj) {
      if (obj[key] && typeof obj[key] === 'object') {
        newObj[key] = deepCopy(obj[key]);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
};

export const throttle = (fn, wait) => {
  var timer = null;
  return function () {
    var context = this;
    var args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
        fn.apply(context, args);
        timer = null;
      }, wait)
    }
  }
}