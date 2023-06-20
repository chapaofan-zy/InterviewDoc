/*
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-06-17 12:46:16
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-06-20 10:49:50
 * @Description: 茶泡饭的完美代码
 */
let workInProgressRoot, nextUnitOfWork;

export function startWorkLoop(rootFiber) {
    workInProgressRoot = rootFiber;
    nextUnitOfWork = workInProgressRoot;
    window.requestIdleCallback(workLoop);
}


function workLoop(deadline) {
    console.log('workLoop, start; workInProgressRoot: ', workInProgressRoot);
    while (nextUnitOfWork && deadline.timeRemaining() > 0) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }

    workInProgressRoot ? commitRoot() : window.requestIdleCallback(workLoop);
}

function performUnitOfWork(fiber) {
    console.log('performUnitOfWork: ', fiber.props.id);
    beginWork(fiber);
    if (fiber.children) return fiber.children;
    while (fiber !== workInProgressRoot) {
        completeUnitOfWork(fiber);
        if (fiber.silbing) return fiber.silbing;
        fiber = fiber.return;
    }
}

function createDOM(fiber) {
    console.log('createDOM: ', fiber.props.id);
    if (fiber.type === 'TEXT') return document.createTextNode(fiber.props.nodeValue);

    function isFunc(f) {
        return typeof f.type !== 'function' ? f : isFunc(f.type(f.props));
    }

    if (typeof fiber.type === 'function') {
        const f = isFunc(fiber.type(fiber.props));
        return createDOM(f);
    } else {
        return document.createElement(fiber.type);
    }
}

function beginWork(fiber) {
    console.log('beginWork: ', fiber.props.id);
    if (!fiber.stateNode) fiber.stateNode = createDOM(fiber);

    fiber.props && Object.keys(fiber.props).filter((e) => e !== 'children').forEach((k) => {
        fiber.stateNode[k] = fiber.props[k];
    });

    let preFiber;

    fiber.props.children && fiber.props.children.forEach((e, i) => {
        const newFiber = {
            type: e.type,
            props: e.props,
            return: fiber,
            effectTag: 'PLACEMENT',
        }
        if (i === 0) {
            fiber.children = newFiber;
        } else {
            if (preFiber) preFiber.silbing = newFiber;
        }
        preFiber = newFiber;
    });
}

function completeUnitOfWork(fiber) {
    console.log('completeUnitOfWork: ', fiber.props.id);
    const returnFiber = fiber.return;
    if (returnFiber) {
        if (!returnFiber.firstEffect) returnFiber.firstEffect = fiber.firstEffect;
        if (fiber.lastEffect) {
            if (returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = fiber.firstEffect;
            }
            returnFiber.lastEffect = fiber.lastEffect;
        }
        if (fiber.effectTag === 'PLACEMENT') {
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
    console.log('commitRoot');
    let currentFiber = workInProgressRoot.firstEffect;
    while (currentFiber) {
        if (currentFiber.effectTag === 'PLACEMENT') {
            currentFiber.return.stateNode.appendChild(currentFiber.stateNode);
        }
        currentFiber = currentFiber.nextEffect;
    }
    workInProgressRoot = null;
}