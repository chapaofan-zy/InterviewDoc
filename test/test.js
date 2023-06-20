/*
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-06-13 14:54:51
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-06-13 15:23:01
 * @Description: 茶泡饭的完美代码
 */
const myTimer = (fn, a, b) => {
    let count = 0;
    let timer;
    const f = () => {
        timer = setTimeout(() => {
            fn();
            console.log(a, a + b * count, count);
            count++;
            f();
        }, a + b * count);
    }
    f();
    return () => clearTimeout(timer);
}

const clear = myTimer(() => {}, 500, 500);

setTimeout(() => clear(), 4000);

function Foo() {
    const n = Foo.n++;
    this.id = n;
    return {
        id: n
    }
}
Foo.n = 0;