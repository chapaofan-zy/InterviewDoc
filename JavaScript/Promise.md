<!--
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-07-04 13:02:22
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-07-04 18:11:07
 * @Description: 茶泡饭的完美代码
-->

## Promise

```js
class MyPromise {
  successCallback = [];
  failCallback = [];
  state = "pending";
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
    if (this.state !== "pending") return;
    this.value = val;
    this.state = "fulfilled";
    while (this.successCallback.length > 0)
      this.successCallback.shift()(this.value);
  };

  reject = (err) => {
    if (this.state !== "pending") return;
    this.error = err;
    this.state = "rejected";
    while (this.failCallback.length > 0) this.failCallback.shift()(this.error);
  };

  then(successCb, failCb) {
    if (typeof successCb !== "function") successCb = () => {};
    if (typeof failCb !== "function") failCb = () => {};
    const p = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (this.state === "fulfilled") {
            const res = successCb(this.value);
            resolvePromise(res, p, resolve, reject, "fulfilled");
          }
          if (this.state === "rejected") {
            const res = failCb(this.error);
            resolvePromise(res, p, resolve, reject, "rejected");
          }
          if (this.state === "pending") {
            this.successCallback.push(() => {
              const res = successCb(this.value);
              resolvePromise(res, p, resolve, reject, "fulfilled");
            });
            this.failCallback.push(() => {
              const res = failCb(this.error);
              resolvePromise(res, p, resolve, reject, "rejected");
            });
          }
        } catch (e) {
          reject(e);
        }
      }, 0);
    });
    return p;
  }

  catch(failCallback) {
    return this.then(undefined, failCallback);
  }

  finally(callback) {
    if (typeof callback !== "function") callback = () => {};
    return this.then(
      (val) => {
        return MyPromise.resolve(callback()).then(() => val);
      },
      (err) => {
        return MyPromise.resolve(callback()).then(() => {
          throw err;
        });
      }
    );
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
        MyPromise.resolve(arr[i]).then(
          (val) => {
            res[i] = val;
            count++;
            if (count === arr.length) resolve(res);
          },
          (err) => reject(err)
        );
      }
    });
  }
}

const resolvePromise = (res, p, resolve, reject, state) => {
  if (res === p) throw "same promise";
  if (res instanceof MyPromise) {
    res.then(
      (val) => resolve(val),
      (rej) => reject(rej)
    );
  } else state === "fulfilled" ? resolve(res) : reject(res);
};
```
