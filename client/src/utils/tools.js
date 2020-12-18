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


export const storageUtil = {
    set: function (key, data, time) {
        try {
            if (!localStorage) return false;
            if (!time || isNaN(time)) {
                time = 60;
            }
            var cacheExpireDate = new Date() - 1 + time * 1000;
            var cacheVal = { val: data, exp: cacheExpireDate };
            localStorage.setItem(key, JSON.stringify(cacheVal));
        } catch (e) { }
    },
    get: function (key) {
        try {
            if (!localStorage) return false;
            var cacheVal = localStorage.getItem(key);
            var result = JSON.parse(cacheVal);
            var now = new Date() - 1;
            if (!result) return null;
            if (now > result.exp) {
                this.remove(key);
                return '';
            }
            return result.val;
        } catch (e) {
            this.remove(key);
            return null;
        }
    },
    remove: function (key) {
        if (!localStorage) {
            return false;
        }
        localStorage.removeItem(key);
    },
};
