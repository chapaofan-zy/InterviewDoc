/*
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-06-10 11:31:20
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-07-21 15:42:45
 * @Description: 茶泡饭的完美代码
 */
const flat = (arr) => {
    if (!Array.isArray(arr)) return [arr];
    const res = [];
    for (const i of arr) {
        res.push(...flat(i));
    }
    return res;
}

const arr = [1, 2, [3, [4]]];

console.log((flat(arr)));

console.log([1, 2, 3].reduce((a, b) => a + b, 1));

Array.prototype.myReduce = function (fn, defaultValue) {
    let res = defaultValue ? defaultValue : this[0];
    for (let i = defaultValue ? 0 : 1; i < this.length; i++) {
        res = fn(res, this[i], i, this);
    }
    return res;
}

console.log([1, 2, 3].myReduce((a, b) => a + b, 1));
console.log([1, 2, 3].myReduce((a, b) => a + b));

const setFlat = (arr) => {
    if (!Array.isArray(arr)) return [arr];
    const res = new Set();
    arr.forEach((e) => {
        if (!Array.isArray) res.add(e);
        else {
            const tmp = [...setFlat(e)];
            tmp.forEach((el) => res.add(el));
        }
    });
    return [...res].sort((a, b) => a - b);
}
const setArr = [
    [1, 2, 2],
    [3, 4, 5, 5],
    [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10
];

console.log('set', setFlat(setArr));