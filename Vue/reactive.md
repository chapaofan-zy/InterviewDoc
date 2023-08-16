## 响应式

```js
class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(target) {
    this.subs.push(target);
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
    this.oldVal = this.getter(obj);
    Dep.target = null;
  }

  getter(data) {
    const res = {};
    const _this = this;
    Object.keys(data).forEach((k) => {
      if (typeof data[k] === "object" && data[k] !== null)
        res[k] = _this.getter(data[k]);
      else res[k] = data[k];
    });
    return res;
  }

  update() {
    const newVal = this.obj[this.key];
    if (newVal === this.oldVal[this.key]) return;
    this.cb(newVal);
  }
}

class Observer {
  constructor(val) {
    this.walk(val);
  }

  walk(val) {
    if (typeof val === "object" && val !== null) {
      Object.keys(val).forEach((k) => this.defineReactive(val, k, val[k]));
    }
  }

  defineReactive(data, key, val) {
    const dep = new Dep();
    const _this = this;
    Object.defineProperty(data, key, {
      get() {
        Dep.target && dep.addSub(Dep.target);
        return val;
      },
      set(newVal) {
        if (newVal === val) return;
        val = newVal;
        dep.notify();
        _this.walk(val);
      },
    });
  }
}

const obj = {
  a: 1,
  b: {
    c: 2,
  },
};

new Observer(obj);
Object.keys(obj).forEach((k) => new Watcher(obj, k, (v) => console.log(v)));

setTimeout(() => (obj.a = 2), 1000);
setTimeout(() => (obj.b.c = 3), 2000);
```
