export default class Depend {
    constructor() {
        this.subs = [];
    }

    addSub(sub) {
        console.log('addsub');
        this.subs.push(sub);
    }

    notify() {
        console.log('notify');
        console.log(this.subs);
        this.subs.forEach((e) => e.update());
    }
}