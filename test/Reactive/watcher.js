import Depend from "./dep.js";

export default class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm;
        this.key = key;
        this.cb = cb;
        Depend.target = this;
        this.oldValue = this.getter(vm.$data);
        Depend.target = null;
    }

    update() {
        console.log('update');
        const newVal = this.vm.$data[this.key];
        if (newVal === this.oldValue) return;
        this.cb(newVal);
    }

    getter(obj) {
        const newVal = {};
        const that = this;
        Object.keys(obj).forEach((e) => {
            if (typeof obj[e] === 'object' && obj[e] !== null) newVal[e] = that.getter(obj[e]);
            else newVal[e] = obj[e];
        });
        return newVal;
    }
}