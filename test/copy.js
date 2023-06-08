/*
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-06-08 19:18:10
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-06-08 19:52:16
 * @Description: 茶泡饭的完美代码
 */
const deepClone = (object) => {
    // 解决循环引用问题
    const m = new WeakMap();
    const fn = (obj) => {
        if (m.get(obj)) return obj;
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

const obj = {
    a: {
        b: 1
    }
}

console.log(deepCopy(null));