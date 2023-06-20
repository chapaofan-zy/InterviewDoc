/*
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-06-09 14:02:55
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-06-09 14:24:24
 * @Description: 茶泡饭的完美代码
 */
const myInstanceof = (left, right) => {
    if (typeof left !== 'object' || left === null) return false;
    const proto = Object.getPrototypeOf(left);
    return proto === right.prototype || myInstanceof(proto, right);
}

console.log(myInstanceof(1, Number));
console.log(myInstanceof({}, Object));
console.log(myInstanceof([], Array));
console.log(myInstanceof(null, Object));
console.log(myInstanceof(undefined, Object));