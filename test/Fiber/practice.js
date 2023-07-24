/*
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-07-14 18:22:14
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-07-24 20:39:59
 * @Description: 茶泡饭的完美代码
 */
let nextUnitOfWork, workInProgressRoot;

function startWorkLoop() {
    workInProgressRoot = rootFiber;
    nextUnitOfWork = workInProgressRoot;
    window.requestIdleCallback(beginLoop);
}

function beginLoop(deadline) {
    while (nextUnitOfWork && deadline.timeRemaining() > 0) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
    workInProgressRoot ? window.requestIdleCallback(beginLoop) : commitRoot();
}

function performUnitOfWork(fiber) {
    beginWork(fiber);
    if (fiber.child) return fiber.child;
    while (fiber !== workInProgressRoot) {
        completeUnitOfWork(fiber);
        if (fiber.sibling) return fiber.sibling;
        fiber = fiber.return;
    }
}

function beginWork(fiber) {
    if (!fiber.stateNode) fiber.stateNode = document.createElement(fiber.tagName);

    Object.keys(fiber.props).forEach((k) => {
        if (fiber.props[k] !== 'children') {
            fiber.stateNode[k] = fiber.props[k];
        }
    });

    let pre;
    const {
        children
    } = fiber.props;
    for (let i = 0; i < children; i++) {
        const childFiber = {
            tagName: children.tagName,
            props: children.props,
            return: fiber
        }
        if (i !== 0) pre.sibling = childFiber;
        else fiber.child = childFiber;
        pre = childFiber;
    }
}

/* function completeUnitOfWork(fiber) {
    if (fiber.return) {
        if (fiber.return)
    }
} */

function commitRoot() {
    let effect = workInProgressRoot.firstEffect;
    while (effect) {
        effect.return.stateNode.appendChild(effect.stateNode);
        effect = nextEffect;
    }
    workInProgressRoot = null;
}