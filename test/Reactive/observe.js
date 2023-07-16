/*
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-07-16 18:31:29
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-07-16 19:27:31
 * @Description: 茶泡饭的完美代码
 */
import Depend from "./dep.js";

export default class Observer {
    constructor(value) {
        this.walk(value);
    }

    walk(value) {
        if (typeof value !== 'object' || !value) return;
        Object.keys(value).forEach((e) => this.defineReactive(value, e, value[e]));
    }

    defineReactive(data, key, val) {
        console.log(data, key, 'defineReactive');
        this.walk(val);

        const that = this;
        const dep = new Depend();
        Object.defineProperty(data, key, {
            get() {
                console.log('get', data, key);
                Depend.target && dep.addSub(Depend.target);
                return val;
            },
            set(newVal) {
                if (newVal === val) return;
                val = newVal;
                that.walk(newVal);
                dep.notify();
            }
        })
    }
}