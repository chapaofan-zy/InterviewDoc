/*
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-06-08 15:14:02
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-06-08 15:46:08
 * @Description: 茶泡饭的完美代码
 */
Function.prototype.myCall = function (...rest) {
    const target = rest.shift();
    const fn = Symbol('fn');
    target[fn] = this;
    const res = target[fn](...rest);
    delete target[fn];
    return res;
}

Function.prototype.myBind = function (...rest) {
    const target = rest.shift();
    const fn = Symbol['fn'];
    target[fn] = this;
    return (...newRest) => {
        const res = target[fn](...rest, ...newRest);
        delete target[fn];
        return res;
    }
    // return (...newRest) => this.myCall(target, ...rest, ...newRest);
}

const obj = {
    n1: 1,
    n2: 2
}

const sum = function (a, b, c) {
    return this.n1 + this.n2 + a + b + c;
};

const fn = sum.myBind(obj, 1);
console.log(fn);
console.log(fn(1, 1));