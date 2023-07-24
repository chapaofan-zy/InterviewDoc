<!--
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-06-08 14:48:14
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-07-22 15:19:13
 * @Description: 茶泡饭的完美代码
-->

## AJAX

```js
const xhr = new XMLHttpRequest();
xhr.open(method, url, [async], ...);
xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4 || xhr.status !== 200) return;
    console.log(xhr.response)
}
xhr.responseType = 'JSON';
xhr.send();
```
