<!--
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-06-09 11:04:50
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-06-13 17:23:44
 * @Description: 茶泡饭的完美代码
-->

## new 操作符

1. 创建空对象 `res`
2. 该对象 `res` 的 `__proto__` 指向构造函数的 `prototype`
3. this 指向该对象 `res`
4. 构造函数是否返回对象 `obj` ? `obj` : `res`

```js
const myNew = (fn, ...rest) => {
  const res = {};
  res.__proto__ = fn.prototype;
  const obj = fn.call(res, ...rest);
  return obj instanceof Object ? obj : res;
};
```
