# 基础数据类型

- boolean

- string

- number

- null

- undefined

- Symbol

---

### boolean

`true` / `false`

#### 类型转换

    string: ''为false，其余均为true

    number: 0 / NaN为false，其余为true

    object: 任意对象为true，null为false

    undefined: false

---

### string

    '' / `` / "" 不存在 prototype

    new String() 存在 prototype

---

### number

同 string，new Number() 存在 prototype

十进制 `const n = 55`

八进制（零开头） `const n = 070 // 八进制的56`

十六进制（0x 开头） `const n = 0xA // 十六进制的10`

    Number.MAX_VALUE === 1.7976931348623157e+308 // 如果超出了这个值，就会返回Infinity
    1.7976931348623157e+309 // Infinity

    Number.MIN_VALUE === 5e-324 // 趋近于0，而不是负无穷
    -1 / 0 === -Infinity

```
typeof Infinity === 'number'
typeof NaN === 'number'
```

    Number.MAX_SAFE_INTEGER === 9007199254740991 // 2^53 - 1

    Number.MIN_SAFE_INTEGER === -9007199254740991 // -(2^53 - 1)

e 表示 0 的数量，例如 `const n = 1e2 // 100`

---

### null

    typeof null == 'object'

    null == undefined  // true

---

### undefined

    undefined == null // true

    undefined === null // false

    undefined == undefined // true

    undefined === undefined // true
