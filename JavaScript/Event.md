<!--
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-07-13 17:06:54
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-07-13 17:23:49
 * @Description: 茶泡饭的完美代码
-->

## 事件代理/委托

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <ul></ul>
    <script src="./event.js"></script>
  </body>
</html>

```

```js
const ul = document.querySelector('ul');

const fragment = document.createDocumentFragment();

new Array(5).fill().forEach((e, i) => {
    const li = document.createElement('li');
    li.key = i;
    li.innerText = `第${i}个`;
    fragment.appendChild(li);
});

ul.appendChild(fragment);

const log = (node) => {
    console.log(node.key);
}

ul.addEventListener('click', (e) => {
    if (e) {
        log(e.target);
    }
});
```