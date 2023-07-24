<!--
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-07-22 16:40:38
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-07-22 17:52:43
 * @Description: 茶泡饭的完美代码
-->

## Hooks

---

[参考文章](https://juejin.cn/post/6844904127110053895)

### useState

---

### useEffect

- 每个 Effect 必然在渲染之后执行，因此不会阻塞渲染，提高了性能

- 在运行每个 Effect 之前，运行前一次渲染的 Effect Cleanup (return) 函数（如果有的话）

  _render -> last effect cleanup -> effect_

- 当组件销毁时，运行最后一次 Effect 的 Cleanup 函数

---

**为什么只在最顶层使用 Hook, Only call hooks at the top level.**

具体地说，不要在循环、嵌套、条件语句中使用 Hook——因为这些动态的语句很有可能会导致每次执行组件函数时调用 Hook 的顺序不能完全一致，导致 Hook 链表记录的数据失效。

[参考文章](https://juejin.cn/post/6939766434159394830)

---

### useEffect 和 useLayoutEffect

- 因为某个事件 state 发生变化。

- React 内部更新 state 变量。

- React 处理更新组件中 return 出来的 DOM 节点（进行一系列 dom diff 、调度等流程）。

- 将更新过后的 DOM 数据绘制到浏览器中。

- 用户看到新的页面。

**useEffect 在第 4 步之后执行，且是异步的，保证了不会阻塞浏览器进程。 useLayoutEffect 在第 3 步至第 4 步之间执行，且是同步代码，所以会阻塞后面代码的执行。**

---

### useCallback 和 useMemo

- useCallback 可缓存函数，其实就是避免每次重新渲染后都去重新执行一个新的函数。

- useMemo 可缓存值。

有很多时候，我们在 useEffect 中使用某个定义的外部函数，是要添加到 deps 数组中的，如果不用 useCallback 缓存，这个函数在每次重新渲染时都是一个完全新的函数，也就是引用地址发生了变化，这就会导致 useEffect 总会无意义的执行。