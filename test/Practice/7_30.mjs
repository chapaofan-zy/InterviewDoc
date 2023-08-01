/*
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-07-30 15:53:02
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-08-01 17:46:39
 * @Description: 茶泡饭的完美代码
 */
import {
    obj,
    callFn,
    sum,
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

Function.prototype.myBind = function (obj, ...rest) {
    const fn = Symbol('fn');
    obj[fn] = this;
    return function (...newRest) {
        const res = obj[fn](...rest, ...newRest);
        delete obj[fn];
        return res;
    }
}

callFn.myCall(obj, '123');

function deepclone(obj) {
    const m = new Map();
    const fn = (o) => {
        if (typeof o !== 'object' && o !== null) return o;
        if (m.has(o)) return m.get(o);
        const res = Array.isArray(o) ? [] : {};
        m.set(o, res);
        Object.keys(o).forEach((k) => {
            res[k] = fn(o[k]);
        });
        return res;
    }
    return fn(obj);
}

const obj1 = deepclone(obj);
console.log(obj1);
console.log(obj1 === obj);

function debounce(fn, delay = 500) {
    let timer;
    return function (...rest) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.call(this, ...rest);
        }, delay);
    }
}

function throttle(fn, delay = 500) {
    let timer;
    return function (...rest) {
        if (!timer) {
            timer = setTimeout(() => {
                fn.call(this, ...rest);
                timer = null;
            }, delay);
        }
    }
}

function myNew(constructor, ...rest) {
    const res = {};
    res.prototype = constructor.prototype;
    const obj = constructor.call(res, ...rest);
    return obj instanceof Object ? obj : res;
}

console.log(myNew(Parent, 'parent'));

function myInstanceOf(left, right) {
    if (!left || typeof left !== 'object') return false;
    return left === right.prototype || myInstanceOf(Object.getPrototypeOf(left), right);
}

function flat(arr) {
    if (!Array.isArray(arr)) return [arr];
    const res = [];
    arr.forEach((e) => {
        res.push(...flat(e));
    });
    return res;
}

console.log(flat(flatArr));

Array.prototype.myReduce = function (fn, defaultVal) {
    let res = defaultVal ? defaultVal : this[0];
    for (let i = defaultVal ? 0 : 1; i < this.length; i++) {
        res = fn(res, this[i]);
    }
    return res;
}

console.log(arr.myReduce(sum));

function Children(age, name) {
    Parent.call(this, name);
    this.age = age;
}

function create(proto) {
    function F() {};
    F.prototype = proto;
    return new F();
}

Children.prototype = create(Parent.prototype);

const children = new Children(18, 'name');
children.getName();

function insert(arr) {
    if (arr.length <= 1) return arr;
    for (let i = 1; i < arr.length; i++) {
        const tmp = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > tmp) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = tmp;
    }
    return arr;
}

console.log(insert([...arr]), 'insert');

function shell(arr) {
    if (arr.length <= 1) return arr;
    for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < arr.length; i++) {
            const tmp = arr[i];
            let j = i - gap;
            while (j >= 0 && arr[j] > tmp) {
                arr[j + gap] = arr[j];
                j -= gap;
            }
            arr[j + gap] = tmp;
        }
    }
    return arr;
}

console.log(shell([...arr]), 'shell');

function merge(arr) {
    if (arr.length <= 1) return [...arr];

    function mer(left, right) {
        const res = [];
        let i = 0,
            j = 0;
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) res.push(left[i++]);
            else res.push(right[j++]);
        }
        while (i < left.length) res.push(left[i++]);
        while (j < right.length) res.push(right[j++]);
        return res;
    }
    const m = Math.floor(arr.length / 2);
    const l = merge(arr.slice(0, m));
    const r = merge(arr.slice(m));
    return mer(l, r);
}

console.log(merge([...arr]), 'merge');

function bubble(arr) {
    if (arr.length <= 1) return arr;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
    return arr;
}

console.log(bubble([...arr]), 'bubble');

function select(arr) {
    if (arr.length <= 1) return arr;
    for (let i = 0; i < arr.length; i++) {
        let min = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) min = j;
        }
        const tmp = arr[min];
        arr[min] = arr[i];
        arr[i] = tmp;
    }
    return arr;
}

console.log(select([...arr]), 'select');

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

console.log(quick([...arr], 0, arr.length - 1), 'qucik');

function ins(arr) {
    if (arr.length <= 1) return [...arr];
    const res = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
        let j = i - 1;
        while (j >= 0 && res[j] > arr[i]) j--;
        res.splice(j + 1, 0, arr[i]);
    }
    return res;
}

console.log(ins([...arr]), 'ins');

class Dep {
    constructor() {
        this.subs = [];
    }

    addSub(e) {
        this.subs.push(e);
    }

    notify() {
        this.subs.forEach((e) => e.update());
    }
}

class Watcher {
    constructor(obj, key, cb) {
        this.obj = obj;
        this.key = key;
        this.cb = cb;
        Dep.target = this;
        this.oldVal = this.getter(this.obj);
        Dep.target = null;
    }

    update() {
        if (this.oldVal[this.key] === this.obj[this.key]) return;
        this.cb(this.obj[this.key]);
    }

    getter(val) {
        if (typeof val !== 'object' || val === null) return val;
        const res = {};
        const _this = this;
        Object.keys(val).forEach((k) => {
            res[k] = _this.getter(val[k]);
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
        Object.keys(obj).forEach((k) => this.defineReactive(obj, k, obj[k]));
    }

    defineReactive(obj, key, val) {
        this.walk(val);
        const dep = new Dep();
        const _this = this;
        Object.defineProperty(obj, key, {
            get() {
                Dep.target && dep.addSub(Dep.target);
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

new Observe(obj);
new Watcher(obj, 'a', (v) => console.log(v));

console.log(obj);
setTimeout(() => obj.a = 10, 1000);

class MP {
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.error = undefined;
        this.scb = [];
        this.fcb = [];
        try {
            executor(this.resolve, this.reject);
        } catch (e) {
            this.reject(e);
        }
    }

    resolve = (v) => {
        if (this.state !== 'pending') return;
        this.state = 'fulfilled';
        this.value = v;
        while (this.scb.length) this.scb.shift()(this.value);
    }

    reject = (e) => {
        if (this.state !== 'pending') return;
        this.error = e;
        this.state = 'rejected';
        while (this.fcb.length) this.fcb.shift()(this.error);
    }

    then(success, fail) {
        const resolvePromise = (res, p, resolve, reject, state) => {
            if (res === p) throw 'same promise';
            if (res instanceof MP) res.then((v) => resolve(v), (e) => reject(e));
            else state === 'fulfilled' ? resolve(res) : reject(res);
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
            }, 0);
        });
        return p;
    }

    static resolve(p) {
        if (p instanceof MP) return p;
        return new MP((r) => r(p));
    }

    finally(cb) {
        return this.then((v) => {
            MP.resolve(cb()).then(() => v);
        }, (e) => {
            MP.resolve(cb()).then(() => {
                throw e
            });
        });
    }

    static all(arr) {
        return new MP((resolve, reject) => {
            let count = 0;
            const res = [];
            arr.forEach((e, i) => {
                MP.resolve(e).then((v) => {
                    res[i] = v;
                    count++;
                    if (count === arr.length) resolve(res);
                }, (e) => reject(e));
            });
        });
    }
}

let nextUnitOfWork, workInProgressRoot;

function beginLoop(deadline) {
    while (deadline.timeRemaining() > 0 && nextUnitOfWork) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
    workInProgressRoot ? window.requestIdleCallback(beginLoop) : commitRoot();
}

function performUnitOfWork(fiber) {
    beginWork(fiber);
    completeWork(fiber);
    if (fiber.child) return fiber.child;
    while (fiber) {
        if (fiber.silbing) return fiber.sibling;
        fiber = fiber.return;
    }
}

function beginWork(fiber) {
    if (!fiber.stateNode) fiber.stateNode = document.createElement(fiber.type);

    fiber.props && Object.keys(fiber.props).forEach((k) => {
        if (k !== 'children') {
            fiber.stateNode[k] = fiber.props[k];
        }
    });

    const children = fiber.props.children;
    let pre;
    if (children) {
        children.forEach((e, i) => {
            const newFiber = {
                return: fiber,
                type: e.type,
                props: e.props
            }
            if (i === 0) fiber.child = newFiber;
            else pre.silbing = newFiber;
            pre = newFiber;
        });
    }
}

function completeWork(fiber) {
    const returnFiber = fiber.return;
    if (returnFiber) {
        if (!returnFiber.firstEffect) {
            returnFiber.firstEffect = fiber.firstEffect;
        }
        if (returnFiber.lastEffect) {
            returnFiber.lastEffect.nextEffect = fiber;
        }
        returnFiber.lastEffect = fiber;
    }
}

function commitRoot() {
    if (workInProgressRoot) {
        let effect = workInProgressRoot.firstEffect;
        while (effect) {
            effect.return.stateNode.appendChild(effect.stateNode);
            effect = effect.nextEffect;
        }
    }
    workInProgressRoot = null;
}

// const xhr = new XMLHttpRequest();

// xhr.open('get', './1');

// xhr.onreadystatechange = () => {
//     if (xhr.readyState === xhr.DONE) {
//         console.log('xhr: done');
//     }
// }

// xhr.responseType = 'JSON';