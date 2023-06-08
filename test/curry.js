/*
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-06-08 16:03:27
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-06-08 16:21:03
 * @Description: 茶泡饭的完美代码
 */
const curry1 = (fn) => {
    return function curried(...rest) {
        if (rest.length >= fn.length) {
            return fn(...rest);
        } else {
            return (...newRest) => {
                return curried(...newRest, ...rest);
            }
        }
    }
}

const sumNum = (a, b, c) => a + b + c;

const currySumNum = curry1(sumNum);

console.log(currySumNum(1, 1)(1));

const curry2 = (fn) => {
    const arr = [];
    return function curried(...rest) {
        if (rest && rest.length > 0) {
            arr.push(...rest);
            return curried;
        }
        return fn(...arr);
    }
}

const sum = (...rest) => {
    return rest.reduce((a, b) => a + b);
}

const currySum = curry2(sum);

console.log(currySum(1, 1)(1)());