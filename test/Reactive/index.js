/*
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-07-16 18:31:01
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-07-16 19:21:38
 * @Description: 茶泡饭的完美代码
 */
import Vue from './vue.js';
const obj = {
    a: {
        m: {
            n: 5
        },
        b: 0
    },
    c: {
        d: {
            e: {
                f: 6666
            }
        }
    }
}

new Vue({
    data: {
        obj
    }
});

setTimeout(() => {
    obj.a.b = 1;
}, 2000);