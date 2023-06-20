/*
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-06-13 16:03:29
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-06-15 15:34:22
 * @Description: 茶泡饭的完美代码
 */

// fiber之前的渲染方式

import React from "./React";

const element = React.createElement(
  "div",
  {
    key: "0",
    ref: "r",
  },
  "hello",
  React.createElement(
    "div",
    {
      title: "son",
    },
    "son"
  )
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

render(element, root);

// Fiber

// interface Fiber {
//   /**
//    * ⚛️ 节点的类型信息
//    */
//   // 标记 Fiber 类型, 例如函数组件、类组件、宿主组件
//   tag: WorkTag;
//   // 节点元素类型, 是具体的类组件、函数组件、宿主组件(字符串)
//   type: any;

//   /**
//    * ⚛️ 结构信息
//    */
//   return: Fiber | null;
//   child: Fiber | null;
//   sibling: Fiber | null;
//   // 子节点的唯一键, 即我们渲染列表传入的key属性
//   key: null | string;

//   /**
//    * ⚛️ 节点的状态
//    */
//   // 节点实例(状态)：
//   //        对于宿主组件，这里保存宿主组件的实例, 例如DOM节点。
//   //        对于类组件来说，这里保存类组件的实例
//   //        对于函数组件说，这里为空，因为函数组件没有实例
//   stateNode: any;
//   // 新的、待处理的props
//   pendingProps: any;
//   // 上一次渲染的props
//   memoizedProps: any; // The props used to create the output.
//   // 上一次渲染的组件状态
//   memoizedState: any;

//   /**
//    * ⚛️ 副作用
//    */
//   // 当前节点的副作用类型，例如节点更新、删除、移动
//   effectTag: SideEffectTag;
//   // 和节点关系一样，React 同样使用链表来将所有有副作用的Fiber连接起来
//   nextEffect: Fiber | null;

//   /**
//    * ⚛️ 替身
//    * 指向旧树中的节点
//    */
//   alternate: Fiber | null;
// }

// root fiber对象
let nextUnitOfWork: any = {
  stateNode: root,
  props: {
    children: [element],
  },
};

let workInProgressRoot = nextUnitOfWork;

function workloop(deadline) {
  if (nextUnitOfWork && deadline.timeRemaining() > 0) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  !nextUnitOfWork && workInProgressRoot && commitRoot();

  // 任务未结束，继续注册requestIdleCallback
  window.requestIdleCallback(workloop);
}

// fiber任务
function performUnitOfWork(fiber) {
  beginWork(fiber);
  if (fiber.child) return fiber.child;
  if (fiber.sibling) return fiber.sibling;
  completeUnitOfWork(fiber);
  // 深度遍历完返回到root节点
  while (fiber !== workInProgressRoot) fiber = fiber.return;
}

function beginWork(fiber) {
  // 不存在dom，即不是根节点
  !fiber.stateNode && (fiber.stateNode = document.createElement(fiber.type));

  fiber.props &&
    Object.keys(fiber.props)
      .filter((e) => e !== "children")
      .forEach((e) => {
        fiber.stateNode[e] = fiber.props[e];
      });

  let preFiber;

  if (fiber.props?.children) {
    if (Array.isArray(fiber.props.children)) {
      fiber.props.children.forEach((e, i) => {
        const childrenFiber = {
          type: e.type,
          props: e.props,
          return: fiber,
          sibling: null,
          effectTag: "PLACEMENT",
          nextEffect: null,
        };
        if (i === 0) {
          fiber.child = childrenFiber;
        } else {
          childrenFiber.sibling = preFiber;
        }
        preFiber = childrenFiber;
      });
    }
  }
}

function completeUnitOfWork(fiber) {}

function commitRoot() {
  commitRootImpl(workInProgressRoot.child);
  workInProgressRoot = null;
}

// 递归添加子节点
function commitRootImpl(fiber) {
  if (!fiber) return;
  fiber.return?.stateNode &&
    fiber.return.stateNode.appendChild(fiber.stateNode);

  commitRootImpl(fiber.child);
  commitRootImpl(fiber.sibling);
}

window.requestIdleCallback(workloop);
