<!--
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-07-22 15:24:56
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-07-22 15:42:27
 * @Description: 茶泡饭的完美代码
-->

## React 事件

### 绑定元素

- 我们在 jsx 中绑定的事件(demo 中的 handerClick，handerChange),根本就没有注册到真实的 dom 上。是绑定在 document 上统一管理的。

  - 在 React17 之前，React 是把事件委托在 document 上的，React17 及以后版本不再把事件委托在 document 上，而是委托在挂载的容器上了。

- 真实的 dom 上的 click 事件被单独处理,已经被 react 底层替换成空函数。

- 我们在 react 绑定的事件,比如 onChange，在 document 上，可能有多个事件与之对应。

- react 并不是一开始，把所有的事件都绑定在 document 上，而是采取了一种按需绑定，比如发现了 onClick 事件,再去绑定 document click 事件。

_document 原生捕获 -> 原生节点捕获 -> 原生节点冒泡 -> react 事件捕获 -> react 事件冒泡 -> document 原生冒泡_

---

### 合成事件

在 react 中，我们绑定的事件 onClick 等，并不是原生事件，而是由原生事件合成的 React 事件，比如 click 事件合成为 onClick 事件。比如 blur , change , input , keydown , keyup 等 , 合成为 onChange。

##### 为什么需要合成事件

- 进行浏览器兼容，实现更好的跨平台，React 采用的是顶层事件代理机制，能够保证冒泡一致性，可以跨浏览器执行。React 提供的合成事件用来抹平不同浏览器事件对象之间的差异，将不同平台事件模拟合成事件

- 避免垃圾回收，事件对象可能会被频繁创建和回收，因此 React 引入事件池，在事件池中获取或释放事件对象。即 React 事件对象不会被释放掉，而是存放进一个数组中，当事件触发，就从这个数组中弹出，避免频繁地去创建和销毁(垃圾回收)

- 方便事件统一管理和事务机制