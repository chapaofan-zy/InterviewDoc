<!--
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-07-15 19:06:10
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-07-15 20:10:04
 * @Description: 茶泡饭的完美代码
-->

## js 继承

```js
function Parent(name = 'parent') {
    console.log('调用父类');
    this.name = name;
    this.getName = function () {
        console.log(this.name + 'getName');
    }
}
Parent.prototype.say = function () {
    console.log(this.name + 'say');
}

function Children(age) {
    this.age = age;
};

function selectType(type) {
    switch (type) {
        case 0:
            // 原型链
            console.log('原型链继承');
            Children.prototype = new Parent();
            Children.prototype.constructor = Children;
            // 不能传父类的参数
            const c11 = new Children();
            const c12 = new Children();
            console.log(c11);
            console.log(c12);
            console.log(c11.name === c12.name); // true
            break;

        case 1:
            // 借用构造函数
            console.log('构造函数继承');

            function Child1(name, age) {
                Parent.call(this, name);
                this.age = age;
            }
            const c21 = new Child1('c1', 18);
            const c22 = new Child1('c2', 20);
            console.log(c21);
            console.log(c22);
            // 父类的属性独立，不能继承父类原型上的方法
            Parent.prototype.walk1 = function () {
                console.log('walk1');
            }
            console.log(c21.getName === c22.getName); // false
            console.log(c21.walk1); // undefined
            break;

        case 2:
            // 组合继承
            console.log('组合继承');

            function Child2(name, age) {
                Parent.call(this, name); // 第二次，每次new调用
                this.age = age;
            }
            Parent.prototype.walk2 = function () {
                console.log('walk2');
            }
            Child2.prototype = new Parent(); // 第一次，一共一次
            Child2.prototype.constructor = Child2;
            const c31 = new Child2('c1', 18);
            const c32 = new Child2('c2', 20);
            // 多调用一次父类，一共三次
            console.log(c31);
            console.log(c32);
            console.log(c31.getName === c32.getName);
            console.log(c31.walk2 === c32.walk2);
            break;

        case 3:
            // 寄生组合继承
            console.log('寄生组合继承');

            function Child3(name, age) {
                Parent.call(this, name);
                this.age = age;
            }
            // 模拟 Object.create()，相当于去除了Parent中的属性，其他同new Parent()
            function myCreate(proto) {
                function F() {};
                F.prototype = proto;
                return new F();
            }
            Child3.prototype = myCreate(Parent.prototype);
            const c41 = new Child3('c1', 18);
            const c42 = new Child3('c2', 20);
            Parent.prototype.walk3 = function () {
                console.log('walk3');
            }
            console.log(c41);
            console.log(c42);
            break;

        case 4:
            // ES6
            class Parent1 {
                constructor(name) {
                    this.name = name;
                }
                say() {
                    console.log(this.name);
                }
            }
            class Child4 extends Parent1 {
                constructor(name, age) {
                    super(name);
                    this.age = age;
                }
            }
            const c51 = new Child4('c1', 18);
            const c52 = new Child4('c2', 20);
            console.log(c51);
            console.log(c52);
            break;

        default:
            break;
    }
}
```