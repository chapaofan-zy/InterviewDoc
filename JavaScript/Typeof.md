<!--
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-06-09 13:56:09
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-06-13 17:24:40
 * @Description: 茶泡饭的完美代码
-->

## Typeof 和 instanceof 以及其他方式

### Typeof

typeof xxx ==> 全部小写的字符串

### instanceof

不能判断基础类型

```js
const myInstanceof = (left, right) => {
    if (typeof left !== 'object' || left === null) return false;
    const proto = Object.getPrototypeOf(left);
    return proto === right.prototype || myInstanceof(proto, right);
}
```

### Object.prototype.toString.call()

Object.prototype.toString.call() ==> `[Object type]`
