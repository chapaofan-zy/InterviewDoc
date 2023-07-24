## HTTP 缓存

### 强缓存

`expires`

http1.0 规范，GMT 格式字符串：`Expires:Mon,18 Oct 2066 23:59:59 GMT`

`cache-control`

no-store // 不走缓存

no-cache // 协商缓存

max-age // 设置强缓存时间 `Cache-Control:max-age=3600` 3600ms

---

### 协商缓存

`Last-Modified/If-Modified-Since`

GMT 格式字符串

`Etag/If-None-Match`

为什么要有 Etag？

- 一些文件也许会周期性的更改，但是内容并不改变(仅仅改变的修改时间)，这个时候我们并不希望客户端认为这个文件被修改了，而重新 GET

- 某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说 1s 内修改了 N 次)，`If-Modified-Since` 能检查到的粒度是秒级的，使用 `Etag` 就能够保证这种需求下客户端在 1 秒内能刷新 N 次 cache

- 某些服务器不能精确的得到文件的最后修改时间

---

### 优先级

`Cache-Control  > expires > Etag > Last-Modified`

---

### 刷新对缓存的影响

- 正常操作：地址栏输入 url，跳转链接，前进后退等

- 手动刷新：f5，点击刷新按钮，右键菜单刷新

- 强制刷新：ctrl + f5，shift+command+r

**正常操作：强制缓存有效，协商缓存有效。 手动刷新：强制缓存失效，协商缓存有效。 强制刷新：强制缓存失效，协商缓存失效**
