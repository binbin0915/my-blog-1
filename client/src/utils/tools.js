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

export const throttle = (fn, threshhold) => {
    var last;
    var timer;
    threshhold || (threshhold = 250);
    return function () {
        var context = this;
        var args = arguments;
        var now = +new Date();
        if (last && now < last + threshhold) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}