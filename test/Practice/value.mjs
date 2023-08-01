const sum = (...rest) => rest.reduce((a, b) => a + b);

function callFn(v) {
    console.log('this:', this);
    console.log(this.a);
    console.log(v);
}

const obj = {
    a: 1,
    b: {
        c: 2
    }
}

function log(...rest) {
    console.log('loglog, this: ', this);
    rest.length && rest.forEach((e) => console.log(e));
}

function Parent(name) {
    this.name = name;
}

Parent.prototype.getName = function () {
    console.log(this.name);
}

const flatArr = [1, 2, [3, [4, [5]]]];

const arr = [4, 2, 3, 4, 37, 123, 1, 53];

export {
    sum,
    obj,
    callFn,
    log,
    Parent,
    flatArr,
    arr
}