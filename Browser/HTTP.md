<!--
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-07-13 19:29:44
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-07-13 19:41:13
 * @Description: 茶泡饭的完美代码
-->

## HTTP

### 1.0

- 短连接，每次请求都需要建立 TCP 连接 Connection: close

- 不支持断点续传

- 认为每台服务器绑定唯一的 ip

- 使用 If-Modified-Since,Expires 作为缓存控制策略

### 1.1

- 默认支持长连接 Connection: keep-alive

- 满足不用等待上一次请求结果，可以继续发送请求，但服务器必须按顺序返回请求结果

- 新增更多缓存控制策略 If-Unmodified-Since, If-Match, If-None-Match, E-tag 等

- 支持只发送 header 信息

- 支持 host 域

### 2.0

- 多路复用，同一个连接并发处理多个请求

- 二进制分帧，采用二进制传输数据，1.x 使用的是文本格式

- 头部数据压缩，使用 HPACK 对 header 数据进行压缩

- 服务器推送
