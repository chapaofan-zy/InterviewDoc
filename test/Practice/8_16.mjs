import {
    sum,
    obj,
    callFn,
    log,
    Parent,
    flatArr,
    arr
} from './value.mjs';

Function.prototype.myCall = function (obj, ...rest) {
    const fn = Symbol('fn');
    obj[fn] = this;
    const res = obj[fn](...rest);
    delete obj[fn];
    return res;
}

// callFn.myCall(obj, 'obj');

Function.prototype.myBind = function (obj, ...rest) {
    const fn = Symbol('fn');
    obj[fn] = this;
    return function (...newRest) {
        const res = obj[fn](...rest, ...newRest);
        delete obj[fn];
        return res;
    }
}

// function sum3(a, b, c) {
//     return a + b + c;
// }

function curry1(fn, ...r) {
    const arr = [...r];
    return function curryFn(...rest) {
        arr.push(...rest);
        if (arr.length >= fn.length) return fn(...arr);
        return curryFn;
    }
}
// const f = curry1(sum3);
// console.log(f(2)(3)(1));

function curry2(fn) {
    const arr = [];
    return function curryFn(...rest) {
        if (rest.length === 0) return fn(...arr);
        arr.push(...rest);
        return curryFn;
    }
}
// const f = curry2(sum);
// console.log(f(1, 2)(3)());

function deepclone(obj) {
    const m = new WeakMap();

    function fn(obj) {
        if (typeof obj !== 'object' || obj === null) return obj;
        if (m.has(obj)) return m.get(obj);
        const res = Array.isArray(obj) ? [] : {};
        m.set(obj, res);
        Object.keys(obj).forEach((k) => {
            res[k] = fn(obj[k]);
        });
        return res;
    }
    return fn(obj);
}
// obj.c = obj;
// obj.fn = sum;
// const o = deepclone(obj);
// console.log(o);

function debounce(fn, delay, immediate) {
    let timer;
    let f = false;
    return function (...rest) {
        const _this = this;
        if (!f && immediate) {
            fn.call(_this, ...rest);
            f = true;
        }
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.call(_this, ...rest);
        }, delay);
    }
}

// const f = debounce(log, 1000, false);
// f(123);
// f(123);
// f(123);
// setTimeout(() => f(1), 1050);

function throttle(fn, delay) {
    let timer;
    return function (...rest) {
        const _this = this;
        if (timer) return;
        timer = setTimeout(() => {
            fn.call(_this, ...rest);
            timer = null;
        }, delay);
    }
}

function throttle1(fn, delay) {
    let oldDate = Date.now() - delay;
    return function (...rest) {
        let newDate = Date.now();
        if (newDate - oldDate < delay) return;
        const _this = this;
        fn.call(_this, ...rest);
        oldDate = Date.now();
    }
}

function myNew(constructor, ...rest) {
    const res = {};
    const obj = constructor.call(res, ...rest);
    res.__proto__ = Object.getPrototypeOf(constructor);
    return obj instanceof Object ? obj : res;
}

function myIns(left, right) {
    if (!left || typeof left !== 'object') return false;
    return left === Object.getPrototypeOf(right) || myIns(Object.getPrototypeOf(left), right);
}

function myFlat(arr) {
    if (!Array.isArray(arr)) return [arr];
    const res = [];
    arr.forEach((e) => {
        res.push(...myFlat(e));
    });
    return res;
}

// console.log(myFlat(flatArr));

Array.prototype.myReduce = function (fn, defaultVal) {
    let res = defaultVal ? defaultVal : this[0];
    for (let i = defaultVal ? 0 : 1; i < this.length; i++) {
        res = fn(res, this[i]);
    }
    return res;
}

// console.log(arr.myReduce(sum, 1));

function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
}

function create(obj) {
    function F() {}
    F.prototype = obj;
    return new F();
}

Child.prototype = create(Object.getPrototypeOf(Parent));

class MP {
    constructor(executor) {
        this.state = 'pending';
        this.scb = [];
        this.fcb = [];
        try {
            executor(this.resolve, this.reject);
        } catch (e) {
            this.reject(e);
        }
    }

    resolve = (val) => {
        if (this.state !== 'pending') return;
        this.state = 'fulfilled';
        this.value = val;
        while (this.scb.length) this.scb.shift()(this.value);
    }

    reject = (err) => {
        if (this.state !== 'pending') return;
        this.state = 'rejected';
        this.error = err;
        while (this.fcb.length) this.fcb.shift()(this.error);
    }

    then(success, fail) {
        function resolvePromise(res, p, resolve, reject, state) {
            if (res === p) throw 'same promise';
            if (res instanceof MP) {
                res.then((v) => resolve(v), (e) => reject(e));
            } else state === 'fulfilled' ? resolve(res) : reject(res);
        }
        const p = new MP((resolve, reject) => {
            setTimeout(() => {
                if (this.state === 'fulfilled') {
                    const res = success(this.value);
                    resolvePromise(res, p, resolve, reject, 'fulfilled');
                }
                if (this.state === 'rejected') {
                    const res = fail(this.error);
                    resolvePromise(res, p, resolve, reject, 'rejected');
                }
                if (this.state === 'pending') {
                    this.scb.push(() => {
                        const res = success(this.value);
                        resolvePromise(res, p, resolve, reject, 'fulfilled');
                    });
                    this.fcb.push(() => {
                        const res = fail(this.error);
                        resolvePromise(res, p, resolve, reject, 'rejected');
                    });
                }
            });
        });
        return p;
    }

    static resolve(p) {
        if (p instanceof MP) return p;
        return new MP((resolve) => resolve(p));
    }

    finally(cb) {
        return this.then((v) => MP.resolve(cb()).then(() => v), (e) => MP.resolve(cb()).then(() => {
            throw e
        }));
    }

    static all(arr) {
        return new MP((resolve, reject) => {
            let count = 0;
            const res = [];
            arr.forEach((e, i) => {
                MP.resolve(e).then((v) => {
                    count++;
                    res[i] = v;
                    if (count === arr.length) resolve(res);
                }, (err) => {
                    reject(err);
                })
            })
        });
    }

    static allSettled(arr) {
        return new MP((resolve) => {
            const res = [];
            let count = 0;
            arr.forEach((e, i) => {
                MP.resolve(e).then((v) => {
                    res[i] = {
                        state: 'fulfilled',
                        value: v
                    };
                    count++;
                    if (count === arr.length) resolve(res);
                }, (err) => {
                    res[i] = {
                        state: 'rejected',
                        error: err
                    };
                    count++;
                    if (count === arr.length) resolve(res);
                });
            });
        });
    }
}

class Dep {
    constructor() {
        this.subs = [];
    }

    add(s) {
        this.subs.push(s);
    }

    notify() {
        console.log('notify');
        this.subs.forEach((e) => {
            e.update()
        });
    }
}

class Watcher {
    constructor(obj, key, cb) {
        this.obj = obj;
        this.key = key;
        this.cb = cb;
        Dep.target = this;
        this.val = this.getter(this.obj);
        Dep.target = null;
    }

    update() {
        console.log('update');
        if (this.val[this.key] === this.obj[this.key]) return;
        this.val[this.key] = this.obj[this.key];
        this.cb(this.obj[this.key]);
    }

    getter(obj) {
        if (typeof obj !== 'object' || obj === null) return obj;
        const res = {};
        const _this = this;
        Object.keys(obj).forEach((k) => {
            res[k] = _this.getter(obj[k]);
        });
        return res;
    }
}

class Observe {
    constructor(obj) {
        this.walk(obj);
    }

    walk(obj) {
        if (typeof obj !== 'object' || obj === null) return;
        const _this = this;
        Object.keys(obj).forEach((k) => _this.defineReactive(obj, k, obj[k]));
    }

    defineReactive(data, key, val) {
        this.walk(val);
        const dep = new Dep();
        const _this = this;
        Object.defineProperty(data, key, {
            get() {
                Dep.target && dep.add(Dep.target);
                return val;
            },
            set(newVal) {
                if (newVal === val) return;
                _this.walk(newVal);
                val = newVal;
                dep.notify();
            }
        });
    }
}
// console.log(obj);
// new Observe(obj);
// new Watcher(obj, 'a', (v) => console.log(v));
// console.log(obj);
// console.log(obj);
// setTimeout(() => obj.a = 10, 1000);

function quick(arr, left, right) {
    if (left >= right) return arr;
    let l = left,
        r = right;
    const tmp = arr[l];
    while (l < r) {
        while (l < r && arr[r] >= tmp) r--;
        arr[l] = arr[r];
        while (l < r && arr[l] <= tmp) l++;
        arr[r] = arr[l];
    }
    arr[l] = tmp;
    quick(arr, left, l - 1);
    quick(arr, l + 1, right);
    return arr;
}

console.log(quick(arr, 0, arr.length - 1));