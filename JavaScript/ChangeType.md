<!--
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-06-08 09:55:53
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-06-08 11:21:15
 * @Description: 茶泡饭的完美代码
-->

# 类型转换

## >> String

#### 1. toString()

null 和 undefined 没有 toString()方法

    const n = 10, f = true;
    typeof n.toString(); // 'string'
    f.toString(); // 'true'

#### 2. String()

可以通过 String()强制转换为 string，null 和 undefined 适用

    String(undefined); // 'undefined'

    String(null); // 'null'

#### 3. + '' 隐式转换

    null + ''; // 'null'

    undefined + ''; // 'undefined'

---

## >> Number

#### 1. Number()

    Number(''); // 0
    Number('111'); // 111
    Number('111aaa'); // NaN
    Number('aaa'); // NaN
    Number(false); // 0
    Number(true); // 1
    Number(null); // 0
    Number(undefined); // NaN

#### 2. parseInt()

parseInt(string, radix)
_radix：进制，2 ~ 36_
_string 1 ~ 9 开头转为 10 进制_
_string 0x 开头转为 16 进制_

只能传字符串或数字，且取整，**_空字符串为 NaN_**

    parseInt(111); // 111
    parseInt(111.999); // 111
    parseInt(''); // NaN
    parseInt('111'); // 111
    parseInt('111 222'); // 111
    parseInt('  111  '); // 111
    parseInt('111.999'); // 111
    parseInt('111.aaa'); // 111
    parseInt('111aaa'); // 111
    parseInt(null); // NaN
    parseInt(undefined); // NaN
    parseInt(false); // NaN
    parseInt(true); // NaN
    parseInt('19', 10); // 19 ==> 1 * Math.pow(10, 1) + 9 * Math.pow(10, 0) => (10 + 9)
    parseInt('11', 2); // 3 ==> 1 * Math.pow(2, 1) + 1 * Math.pow(2, 0) => (2 + 1)
    parseInt('123', 4); // 27 ==> 1 * Math.pow(4, 2) + 2 * Math.pow(4, 1)+ 3 * Math.pow(4, 0) => (16 + 8 + 3)

    parseInt('F', 16); // 15
    parseInt('F', 15); // NaN

#### 3. parseFloat()

同 parseInt()，不过支持小数点，且不能指定进制

#### 4. 隐式转换

相当于系统自动使用 Number()

    '1' * 1; // 1

---

# >> Boolean

#### Boolean()

空字符串, null, undefined, NaN, 0 均转为 false，其他的全为 true
