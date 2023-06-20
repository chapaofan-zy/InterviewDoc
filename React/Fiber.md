<!--
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-06-13 16:03:19
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-06-20 11:08:56
 * @Description: 茶泡饭的完美代码
-->

## Fiber

### Fiber 之前

```js
const example = (
  <div id="0">
    <div id="1"></div>
    <div id="2"></div>
  </div>
);

const render = (element, parentElement) => {
  const dom =
    typeof element === "object"
      ? document.createElement(element.type)
      : document.createTextNode(element);

  element.props &&
    Object.keys(element.props)
      .filter((e) => e !== "children")
      .forEach((e) => {
        dom[e] = element.props[e];
      });

  if (element.props?.children) {
    if (Array.isArray(element.props.children)) {
      element.children.forEach((e) => {
        dom.appendChild(render(e, element));
      });
    } else {
      dom.appendChild(render(element.props.children, element));
    }
  }

  parentElement.appendChild(dom);
};

const root = document.getElementById("#root");

render(example, root);
```

---

### Fiber

#### 实现 createElement 方法 (手写自己的 React.js)

```js
function createElement(type, config, children) {
  const props = {};
  const key = config.key ? config.key : null;
  const ref = config.ref ? config.ref : null;
  Object.keys(config)
    .filter((k) => k !== "key" || "ref")
    .forEach((k) => {
      props[k] = config[k];
    });
  if (arguments.length === 3) props.children = [children];
  else {
    const arr = [];
    for (let i = 2; i < arguments.length; i++) {
      arr.push(arguments[i]);
    }
    props.children = arr;
  }
  return {
    $$typeof: "REACT_TYPE",
    type,
    ref,
    props,
    key,
  };
}

export default {
  createElement,
};
```

#### 实现 fiber (手写自己的 ReactDOM.js)

```js
let workInProgressRoot, nextUnitOfWork;

export function startWorkLoop(rootFiber) {
  workInProgressRoot = rootFiber;
  nextUnitOfWork = workInProgressRoot;
  window.requestIdleCallback(workLoop);
}

function workLoop(deadline) {
  console.log("workLoop, start; workInProgressRoot: ", workInProgressRoot);
  while (nextUnitOfWork && deadline.timeRemaining() > 0) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  workInProgressRoot ? commitRoot() : window.requestIdleCallback(workLoop);
}

function performUnitOfWork(fiber) {
  console.log("performUnitOfWork: ", fiber.props.id);
  beginWork(fiber);
  if (fiber.children) return fiber.children;
  while (fiber !== workInProgressRoot) {
    completeUnitOfWork(fiber);
    if (fiber.silbing) return fiber.silbing;
    fiber = fiber.return;
  }
}

function createDOM(fiber) {
  console.log("createDOM: ", fiber.props.id);
  if (fiber.type === "TEXT")
    return document.createTextNode(fiber.props.nodeValue);

  function isFunc(f) {
    return typeof f.type !== "function" ? f : isFunc(f.type(f.props));
  }

  if (typeof fiber.type === "function") {
    const f = isFunc(fiber.type(fiber.props));
    return createDOM(f);
  } else {
    return document.createElement(fiber.type);
  }
}

function beginWork(fiber) {
  console.log("beginWork: ", fiber.props.id);
  if (!fiber.stateNode) fiber.stateNode = createDOM(fiber);

  fiber.props &&
    Object.keys(fiber.props)
      .filter((e) => e !== "children")
      .forEach((k) => {
        fiber.stateNode[k] = fiber.props[k];
      });

  let preFiber;

  fiber.props.children &&
    fiber.props.children.forEach((e, i) => {
      const newFiber = {
        type: e.type,
        props: e.props,
        return: fiber,
        effectTag: "PLACEMENT",
      };
      if (i === 0) {
        fiber.children = newFiber;
      } else {
        if (preFiber) preFiber.silbing = newFiber;
      }
      preFiber = newFiber;
    });
}

function completeUnitOfWork(fiber) {
  console.log("completeUnitOfWork: ", fiber.props.id);
  const returnFiber = fiber.return;
  if (returnFiber) {
    if (!returnFiber.firstEffect) returnFiber.firstEffect = fiber.firstEffect;
    if (fiber.lastEffect) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = fiber.firstEffect;
      }
      returnFiber.lastEffect = fiber.lastEffect;
    }
    if (fiber.effectTag === "PLACEMENT") {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = fiber;
      } else {
        returnFiber.firstEffect = fiber;
      }
      returnFiber.lastEffect = fiber;
    }
  }
}

function commitRoot() {
  console.log("commitRoot");
  let currentFiber = workInProgressRoot.firstEffect;
  while (currentFiber) {
    if (currentFiber.effectTag === "PLACEMENT") {
      currentFiber.return.stateNode.appendChild(currentFiber.stateNode);
    }
    currentFiber = currentFiber.nextEffect;
  }
  workInProgressRoot = null;
}
```

#### 调用

index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      #root {
        width: 300px;
        height: 300px;
        background: #000;
      }

      #parent {
        width: 200px;
        height: 200px;
        background: #7c7c7c;
      }

      #son {
        width: 100px;
        height: 100px;
        background: #ffffff;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./index.js"></script>
  </body>
</html>
```

index.js

```js
import React from "./React.js";
import { startWorkLoop } from "./ReactDOM.js";

const element = React.createElement(
  "div",
  {
    key: "0",
    ref: "r",
    id: "parent",
  },
  React.createElement("div", {
    title: "son",
    id: "son",
  })
);

console.log(element);

const rootFiber = {
  stateNode: document.querySelector("#root"),
  type: "div",
  props: {
    id: "root",
    children: [element],
  },
};

startWorkLoop(rootFiber);
```

```js
interface Fiber {
  /**
   * ⚛️ 节点的类型信息
   */
  // 标记 Fiber 类型, 例如函数组件、类组件、宿主组件
  tag: WorkTag;
  // 节点元素类型, 是具体的类组件、函数组件、宿主组件(字符串)
  type: any;

  /**
   * ⚛️ 结构信息
   */
  return: Fiber | null;
  child: Fiber | null;
  sibling: Fiber | null;
  // 子节点的唯一键, 即我们渲染列表传入的key属性
  key: null | string;

  /**
   * ⚛️ 节点的状态
   */
  // 节点实例(状态)：
  //        对于宿主组件，这里保存宿主组件的实例, 例如DOM节点。
  //        对于类组件来说，这里保存类组件的实例
  //        对于函数组件说，这里为空，因为函数组件没有实例
  stateNode: any;
  // 新的、待处理的props
  pendingProps: any;
  // 上一次渲染的props
  memoizedProps: any; // The props used to create the output.
  // 上一次渲染的组件状态
  memoizedState: any;

  /**
   * ⚛️ 副作用
   */
  // 当前节点的副作用类型，例如节点更新、删除、移动
  effectTag: SideEffectTag;
  // 和节点关系一样，React 同样使用链表来将所有有副作用的Fiber连接起来
  nextEffect: Fiber | null;

  /**
   * ⚛️ 替身
   * 指向旧树中的节点
   */
  alternate: Fiber | null;
}
```
