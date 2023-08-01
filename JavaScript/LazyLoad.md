<!--
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-08-01 15:54:06
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-08-01 15:54:48
 * @Description: 茶泡饭的完美代码
-->

## 图片懒加载

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script defer src="./lazyLoad.js"></script>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      .box {
        height: 2000px;
        background: #000;
        overflow: hidden;
      }

      img {
        display: block;
      }
    </style>
  </head>
  <body>
    <img src="" data_src="./1" />
    <img src="" data_src="./2" />
    <div class="box"></div>
    <img src="" data_src="./3" />
  </body>
</html>
```

```js
const imgs = document.querySelectorAll("img");

function lazy(arr) {
  arr.forEach((e) => {
    if (e.isIntersecting) {
      e.target.setAttribute("src", e.target.getAttribute("data_src"));
      observer.unobserve(e.target);
      console.log("lazy:", e.target);
    }
  });
}

const observer = new IntersectionObserver(lazy);

imgs.forEach((e) => observer.observe(e));
```
