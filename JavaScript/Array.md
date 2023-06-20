## Array

### 扁平化

```js
const flat = (arr) => {
  if (!Array.isArray(arr)) return [arr];
  const res = [];
  for (const i of arr) {
    res.push(...flat(i));
  }
  return res;
};
```

---

### reduce

```js
// 箭头函数this由上下文确定
Array.prototype.myReduce = function (fn, defaultValue) {
  let res = defaultValue ? defaultValue : this[0];
  for (let i = defaultValue ? 0 : 1; i < this.length; i++) {
    res = fn(res, this[i], i, this);
  }
  return res;
};
```
