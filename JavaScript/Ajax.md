<!--
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-06-08 14:48:14
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-06-08 14:59:31
 * @Description: 茶泡饭的完美代码
-->

## AJAX

```
const xhr = new XMLHttpRequest();
xhr.open(method, url, [async], ...);
xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4 || xhr.status !== 200) return;
    console.log(xhr.response)
}
xhr.responseType = 'JSON';
xhr.send();
```

## 状态码

200, OK，访问正常

301, Moved Permanently，永久移动

302, Move temporarily，暂时移动

304, Not Modified，未修改

307, Temporary Redirect，暂时重定向

401, Unauthorized，未授权

403, Forbidden，禁止访问

404, Not Found，未发现指定网址

500, Internal Server Error，服务器发生错误
