/*
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-06-09 10:08:31
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-07-13 14:35:36
 * @Description: 茶泡饭的完美代码
 */
function debounce1(fn, delay = 500) {
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
function debounce2(fn, delay = 500, immediate = false) {
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
function throttle1(fn, delay = 500) {
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
function throttle2(fn, delay = 500) {
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