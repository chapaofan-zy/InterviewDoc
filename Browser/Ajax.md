<!--
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-06-08 14:48:14
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-07-26 18:43:51
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

---

## Fetch

```js
const res = fetch(url, {
    method: 'post',
    body: 'k: v'
}).then((response) => response.json());

res.then((data) => console.log(data));
```