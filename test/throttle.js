const debounce1 = (fn, delay = 500) => {
    let timer;
    return function (...rest) {
        const that = this;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(that, rest);
        }, delay);
    }
}

// 立即执行
const debounce2 = (fn, delay = 500, immediate = false) => {
    let timer;
    let flag = false;
    return function (...rest) {
        const that = this;
        if (immediate && !flag) {
            fn.apply(that, rest);
            flag = true;
            timer = setTimeout(() => {}, delay);
        } else {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(that, rest);
            }, delay);
        }
    }
}

// 时间戳
const throttle1 = (fn, delay = 500) => {
    let oldDate = Date.now();
    return function (...rest) {
        const that = this;
        const newDate = Date.now();
        if (newDate - oldDate >= delay) {
            fn.apply(that, rest);
            oldDate = Date.now();
        }
    }
}

// 计时器
const throttle2 = (fn, delay = 500) => {
    let timer;
    return function (...rest) {
        const that = this;
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(that, rest);
                timer = null;
            }, delay);
        }
    }
}