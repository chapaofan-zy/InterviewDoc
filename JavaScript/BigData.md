<!--
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-07-31 14:42:38
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-08-02 11:05:48
 * @Description: 茶泡饭的完美代码
-->

### 大数据插入

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="./index.js" defer></script>
  </head>
  <body>
    <input type="text" class="input" />
    <button class="genData">生成数据</button>
    <button class="insert">插入</button>
    <div class="box"></div>
  </body>
</html>
```

```js
const box = document.querySelector('.box');
const input = document.querySelector('.input');
const genBtn = document.querySelector('.genData');
const insert = document.querySelector('.insert');

const arr = [];

genBtn.addEventListener('click', () => {
    const n = input.value;
    for (let i = 0; i < n; i++) arr.push(i);
});

const len = [];

function genArr(deadline, gap) {
    while (deadline.timeRemaining() > 0 && arr.length) {
        const tmp = document.createDocumentFragment();
        for (let i = 0; i < gap; i++) {
            if (!arr.length) break;
            const node = document.createElement('div');
            node.innerText = arr.shift();
            tmp.appendChild(node);
        }
        len.push(tmp);
    }
    window.requestAnimationFrame(insertNode);
    arr.length && window.requestIdleCallback((d) => genArr(d, gap));
}

function insertNode() {
    if (!len.length) return;
    box.appendChild(len.shift());
    window.requestAnimationFrame(insertNode);
}

insert.addEventListener('click', () => window.requestIdleCallback((d) => genArr(d, 100)));
```
