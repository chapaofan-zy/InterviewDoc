<!--
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-06-08 15:01:20
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-06-08 15:46:56
 * @Description: 茶泡饭的完美代码
-->

## call

```
Function.prototype.myCall = function (...rest) {
    const target = rest.shift();
    const fn = Symbol('fn');
    target[fn] = this;
    const res = target[fn](...rest);
    delete target[fn];
    return res;
}
```

## apply

同 call，参数为数组

```
Function.prototype.myApply = function (target, arr) {
    const fn = Symbol['fn'];
    target[fn] = this;
    const res = target[fn](...arr);
    delete target[fn];
    return res;
}
```

## bind

```
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
```
