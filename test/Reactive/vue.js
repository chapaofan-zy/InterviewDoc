/*
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-07-16 19:12:05
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-07-16 19:25:29
 * @Description: 茶泡饭的完美代码
 */
import Observer from "./observe.js";
import Watcher from './watcher.js';

export default class Vue {
    constructor(options) {
        this.$data = options.data || {};
        new Observer(this.$data);
        // Object.keys(this.$data).forEach((k) => new Observer(this.$data[k]));
        Object.keys(this.$data).forEach((k) => new Watcher(this, k, (newVal) => console.log('newVal --> ', newVal)));
    }
}