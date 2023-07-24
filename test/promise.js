/*
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-07-04 13:36:12
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-07-21 20:44:29
 * @Description: 茶泡饭的完美代码
 */
export default class MyPromise {
    successCallback = [];
    failCallback = [];
    state = 'pending';
    value = undefined;
    error = undefined;

    constructor(executor) {
        try {
            executor(this.resolve, this.reject);
        } catch (e) {
            this.reject(e);
        }
    }

    resolve = (val) => {
        if (this.state !== 'pending') return;
        this.value = val;
        this.state = 'fulfilled';
        while (this.successCallback.length > 0) this.successCallback.shift()(this.value);
    }

    reject = (err) => {
        if (this.state !== 'pending') return;
        this.error = err;
        this.state = 'rejected';
        while (this.failCallback.length > 0) this.failCallback.shift()(this.error);
    }

    then(successCb, failCb) {
        if (typeof successCb !== 'function') successCb = () => {};
        if (typeof failCb !== 'function') failCb = () => {};
        const p = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    if (this.state === 'fulfilled') {
                        const res = successCb(this.value);
                        resolvePromise(res, p, resolve, reject, 'fulfilled');
                    }
                    if (this.state === 'rejected') {
                        const res = failCb(this.error);
                        resolvePromise(res, p, resolve, reject, 'rejected');
                    }
                    if (this.state === 'pending') {
                        this.successCallback.push(() => {
                            const res = successCb(this.value);
                            resolvePromise(res, p, resolve, reject, 'fulfilled');
                        });
                        this.failCallback.push(() => {
                            const res = failCb(this.error);
                            resolvePromise(res, p, resolve, reject, 'rejected')
                        })
                    }
                } catch (e) {
                    reject(e);
                }
            }, 0);
        });
        return p;
    }

    catch1(failCallback) {
        return this.then(undefined, failCallback);
    }

    finally(callback) {
        if (typeof callback !== 'function') callback = () => {};
        return this.then((val) => {
            return MyPromise.resolve(callback()).then(() => val);
        }, (err) => {
            return MyPromise.resolve(callback()).then(() => {
                throw err;
            });
        });
    }

    static resolve(val) {
        if (val instanceof MyPromise) return val;
        return new MyPromise((resolve) => resolve(val));
    }

    static all(arr) {
        return new MyPromise((resolve, reject) => {
            const res = [];
            let count = 0;
            for (let i = 0; i < arr.length; i++) {
                MyPromise.resolve(arr[i]).then((val) => {
                    res[i] = val;
                    count++;
                    if (count === arr.length) resolve(res);
                }, (err) => reject(err));
            }
        });
    }
}

const resolvePromise = (res, p, resolve, reject, state) => {
    if (res === p) throw 'same promise';
    if (res instanceof MyPromise) {
        res.then(val => resolve(val), rej => reject(rej));
    } else state === 'fulfilled' ? resolve(res) : reject(res);
}

// const p = new MyPromise((resolve, reject) => {
//     console.log('promise 1');
//     setTimeout(() => resolve(2000), 2000);
// });
// const p1 = p.then((val) => {
//     console.log(val);
//     return p1;
// });

class MP {
    constructor(executor) {
        this.value = undefined;
        this.state = 'pending';
        this.error = undefined;
        this.failCb = [];
        this.successCb = [];
        try {
            executor(this.resolve, this.reject);
        } catch(e) {
            this.reject(e);
        }
    }

    resolve = (val) => {
        if (this.state !== 'pending') return;
        this.state = 'fulfilled';
        this.value = val;
        while (this.successCb.length > 0) this.successCb.shift()(val);
    }

    reject = (err) => {
        if (this.state !== 'pending') return;
        this.error = err;
        this.state = 'rejected';
        while(this.failCb.length > 0) this.failCb.shift()(err);
    }

    then(sCb, fCb) {
        const resolvePromise = (res, p, resolve, reject, state) => {
            if (res === p) throw 'same promise';
            if (res instanceof MP) res.then((v) => resolve(v), e => reject(e));
            else state === 'fulfilled' ? resolve(res) : reject(res);
        }
        const p = new MP((resolve, reject) => {
            setTimeout(() => {
                if (this.state === 'fulfilled') {
                    const res = sCb(this.value);
                    resolvePromise(res, p, resolve, reject, 'fulfilled');
                }
                if (this.state === 'rejected') {
                    const res = fCb(this.error);
                    resolvePromise(res, p, resolve, reject, 'rejected');
                }
                if (this.state === 'pending') {
                    this.successCb.push(() => {
                        const res = sCb(this.value);
                    resolvePromise(res, p, resolve, reject, 'fulfilled');
                    });
                    this.failCb.push(() => {
                        const res = fCb(this.error);
                    resolvePromise(res, p, resolve, reject, 'rejected');
                    })
                }
            });
        });
        return p;
    }

    finally(cb) {
        return this.then((v) => {
            MP.resolve(cb()).then(() => v);
        }, (e) => {
            MP.resolve(cb()).then(() => { throw e });
        })
    }

    static resolve(p) {
        if (p instanceof MP) return p;
        return new MP((resolve) => resolve(p));
    }

    static all(arr) {
        const res = [];
        let count = 0;
        return new Promise((resolve, reject) => {
            arr.forEach((e) => {
                MP.resolve(e).then((v, i) => {
                    res[i] = v;
                    count++;
                    if (count === arr.length) resolve(res);
                }, (e) => {
                    reject(e);
                });
            })
        })
    }
}