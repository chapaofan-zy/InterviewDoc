Function.prototype.myCall = function (...rest) {
    const obj = rest.shift();
    const fn = this;
    const s = Symbol('fn');
    obj[s] = fn;
    const res = obj[s](...rest);
    delete obj[s];
    return res;
}

Function.prototype.myBind = function (...rest) {
    const obj = rest.shift();
    const s = Symbol('fn');
    obj[s] = this;
    return function (...newRest) {
        const res = obj[s](...rest, ...newRest);
        delete obj[s];
        return res;
    }
}

function curry1(...rest) {
    const fn = rest.shift();
    const arr = [...rest];
    if (arr.length === fn.length) return fn(...arr);
    return function cfn(...newRest) {
        arr.push(...newRest);
        return arr.length === fn.length ? fn(...arr) : cfn;
    }
}

function curry2(...rest) {
    const fn = rest.shift();
    const arr = [...rest];
    return function cfn(...newRest) {
        if (newRest.length === 0) return fn(...arr);
        arr.push(...newRest);
        return cfn;
    }
}

function deepclone(obj) {
    const m = new WeakMap();

    function fn(o) {
        if (typeof o !== 'object' || o === null) return o;
        if (m.has(o)) return m.get(o);
        const res = Array.isArray(o) ? [] : {};
        m.set(o, res);
        Object.keys(o).forEach((k) => {
            if (typeof o[k] === 'object' && o[k] !== null) res[k] = fn(o[k]);
            else res[k] = o[k];
        });
        return res;
    }
    return fn(obj);
}

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
        if (timer) return;
        timer = setTimeout(() => {
            fn.call(this, ...rest);
            timer = null;
        }, delay);
    }
}

function myNew(fn, ...rest) {
    const res = {};
    res.__proto__ = fn.prototype;
    const obj = fn.call(res, ...rest);
    return obj instanceof Object ? obj : res;
}

function myInstanceof(left, right) {
    if (typeof left !== 'object' || left === null) return false;
    return left === right.prototype || myInstanceof(left.__proto__, right);
}

function flat(arr) {
    if (!Array.isArray(arr)) return [arr];
    const res = [];
    arr.forEach((e) => {
        res.push(...flat(e));
    });
    return res;
}

Array.prototype.myReduce = function (fn, defaultValue) {
    let res = defaultValue ? defaultValue : this[0];
    for (let i = defaultValue ? 0 : 1; i < this.length; i++) {
        res = fn(res, this[i]);
    }
    return res;
}

class MyPromise {
    constructor(executor) {
        this.state = 'pending';
        this.scb = [];
        this.fcb = [];
        this.value = undefined;
        this.error = undefined;
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
        while (this.scb.length > 0) this.scb.shift()(this.value);
    }

    reject = (err) => {
        if (this.state !== 'pending') return;
        this.state = 'rejected';
        this.error = err;
        while (this.fcb.length > 0) this.fcb.shift()(this.error);
    }

    then(successCb, failCb) {
        function resolvePromise(res, p, resolve, reject, state) {
            if (res === p) throw 'same promise';
            if (res instanceof MyPromise) res.then((v) => resolve(v), (e) => reject(e));
            else state === 'fulfilled' ? resolve(res) : reject(res);
        }
        const p = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                if (this.state === 'fulfilled') {
                    const res = successCb(this.value);
                    resolvePromise(res, p, resolve, reject, 'fulfilled');
                }
                if (this.state === 'rejected') {
                    const res = failCb(this.error);
                    resolvePromise(res, p, resolve, reject, 'rejected');
                }
                if (this.state === 'pending') {
                    this.scb.push(() => {
                        const res = successCb(this.value);
                        resolvePromise(res, p, resolve, reject, 'fulfilled');
                    });
                    this.fcb.push(() => {
                        const res = failCb(this.error);
                        resolvePromise(res, p, resolve, reject, 'rejected');
                    })
                }
            }, 0);
        });
        return p;
    };

    finally(cb) {
        this.then((v) => {
            MyPromise.resolve(cb()).then(() => v);
        }, (e) => {
            MyPromise.resolve(cb()).then(() => {
                throw e;
            });
        })
    }

    static resolve(p) {
        if (p instanceof MyPromise) return p;
        return new MyPromise((resolve) => resolve(p));
    }

    static all(arr) {
        return new MyPromise((resolve, reject) => {
            const res = [];
            let count = 0;
            arr.forEach((e, i) => {
                MyPromise.resolve(e).then((v) => {
                    res[i] = v;
                    count++;
                    if (count === arr.length) resolve(res);
                }, (e) => {
                    reject(e);
                })
            });
        });
    }
}

function Parent(name) {
    this.name = name;
}

function Son(name, age) {
    Parent.call(this, name);
    this.age = age;
}

function myCreate(obj) {
    function F() {};
    F.prototype = obj;
    return new F();
}

Son.prototype = myCreate(Parent.prototype);

function quick(arr, left, right) {
    if (left > right) return arr;
    let l = left,
        r = right;
    const tmp = arr[left];
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

const arr = [6, 3, 8, 6, 2, 1];

function select(arr) {
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

function bubble(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                const tmp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = tmp;
            }
        }
    }
    return arr;
}

function insert(arr) {
    for (let i = 1; i < arr.length; i++) {
        let j = i - 1;
        const tmp = arr[i];
        while (arr[j] > tmp && j >= 0) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = tmp;
    }
    return arr;
}

function shell(arr) {
    for (let gap = Math.floor(arr.length / 2); gap >= 1; gap = Math.floor(gap / 2)) {
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

function merge(arr) {
    if (arr.length <= 1) return arr;

    function m(l, r) {
        const res = [];
        while (l.length > 0 && r.length > 0) {
            l[0] < r[0] ? res.push(l.shift()) : res.push(r.shift());
        }
        while (l.length > 0) res.push(l.shift());
        while (r.length > 0) res.push(r.shift());
        return res;
    }
    const mid = Math.floor(arr.length / 2);
    const l = merge(arr.slice(0, mid));
    const r = merge(arr.slice(mid));
    return m(l, r);
}

class Dep {
    constructor() {
        this.subs = [];
    }

    addsub(e) {
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
        this.old = this.getter(this.obj);
        Dep.target = null;
    }

    getter(obj) {
        const res = {};
        const _this = this;
        Object.keys(obj).forEach((k) => {
            if (typeof obj[k] === 'object' && obj[k] !== null) res[k] = _this.getter(obj[k]);
            else res[k] = obj[k];
        })
        return res;
    }

    update() {
        const newVal = this.obj[this.key];
        if (newVal === this.old) return;
        this.cb(newVal);
    }
}

class Observer {
    constructor(obj) {
        this.walk(obj);
    }

    walk(obj) {
        if (typeof obj !== 'object' || obj === null) return;
        Object.keys(obj).forEach((key) => this.defineReactive(obj, key, obj[key]));
    }

    defineReactive(data, key, val) {
        const dep = new Dep();
        const _this = this;
        this.walk(val);
        Object.defineProperty(data, key, {
            get() {
                Dep.target && dep.addsub(Dep.target);
                return val;
            },
            set(newVal) {
                if (newVal === val) return;
                val = newVal;
                dep.notify();
                _this.walk(newVal);
            }
        });
    }
}

const obj = {
    a: 1,
    b: 2
}

new Observer(obj);
new Watcher(obj, 'a', (v) => console.log(v))

let nextUnitOfWork, workinProgressRoot;

const rootFiber = {};

workinProgressRoot = rootFiber;
nextUnitOfWork = workinProgressRoot;

function beginLoop(deadline) {
    while (nextUnitOfWork && deadline.timeRemaining() > 0) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
    workinProgressRoot ? window.requestIdleCallback(beginLoop) : commitRoot();
}

function performUnitOfWork(fiber) {
    beginWork(fiber);
    if (fiber.children) return fiber.children;
    while (fiber) {
        completeUnitOfWork(fiber);
        if (fiber.sibling) return fiber.sibling;
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

    let pre;
    const children = fiber.props.children;
    for (let i = 0; i < children.length; i++) {
        const childFiber = {
            type: children.type,
            return: fiber,
            effectTag: 'PLACEMENT',
            props: children.props
        };
        if (i === 0) {
            fiber.child = childFiber;
        } else {
            pre.sibling = childFiber;
        }
        pre = childFiber;
    }
}

function completeUnitOfWork(fiber) {
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
    if (workinProgressRoot) {
        let fiber = workinProgressRoot.firstEffect;
        while (fiber) {
            fiber.return.stateNode.appendChild(fiber.stateNode);
            fiber = fiber.nextEffect;
        }
    }
    workinProgressRoot = null;
}