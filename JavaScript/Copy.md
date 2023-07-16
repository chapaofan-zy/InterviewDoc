<!--
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-06-08 16:26:41
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-07-11 21:13:55
 * @Description: 茶泡饭的完美代码
-->

## 浅拷贝

只拷贝一层

## 深拷贝

1. JSON.parse(JSON.stringify(obj))

   该方法不能解决属性为函数，undefined，循环引用（obj.c = obj）的的情况

2. 手写 deepClone

```js
const deepClone = (object) => {
    // 解决循环引用问题
    const m = new WeakMap();
    const fn = (obj) => {
        if (m.get(obj)) return m.get(obj);
        else {
            if (typeof obj !== 'object' || obj === null) return obj;
            const res = obj instanceof Array ? [] : {};
            m.set(obj, res);
            // 遍历所有属性，包括原型上的属性
            // for (const i in obj) {
            //     if (obj.hasOwnProperty(i)) {
            //         if (typeof obj[i] === 'object') res[i] = fn(obj[i]);
            //         else res[i] = obj[i];
            //     }
            // }

            // 遍历所有可枚举属性
            Object.keys(obj).forEach((i) => {
                if (typeof obj[i] === 'object') res[i] = fn(obj[i]);
                else res[i] = obj[i];
            });

            // 遍历所有属性，包含不可枚举的
            // Object.getOwnPropertyNames(obj).forEach((i) => {
            //     if (typeof obj[i] === 'object') res[i] = fn(obj[i]);
            //     else res[i] = obj[i];
            // });
            return res;
        }
    }
    return fn(object);
}
```
