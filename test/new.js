const myNew = (fn, ...rest) => {
    const res = {};
    res.__proto__ = fn.prototype;
    const obj = fn.call(res, ...rest);
    return obj instanceof Object ? obj : res;
}

function Person(name) {
    this.name = name;
}
Person.prototype.age = 18;

const p = myNew(Person, 'zs');