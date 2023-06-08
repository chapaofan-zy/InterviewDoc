<!--
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-06-08 15:48:32
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-06-08 16:23:29
 * @Description: 茶泡饭的完美代码
-->

## cookie

4kb

字段

- Name
- Value
- Domain _域_
- Path _路径_
- Expires/Max-age
- Size
- HttpOnly _仅在 http 层面传输，客户端无法操作 cookie，防止 XSS_
- secure _是否在 https 上传输_

  ...

多个 cookie 以 ; 隔开

## localstorage

5m

只能存字符串，存储对象 _[Object object]_

持久化存储

## sessionstorage

同 localstorage

会话期间存在
