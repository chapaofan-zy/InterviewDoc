const rootFiber = {
    stateNode: document.querySelector('#root'),
    props: {
        id: 'root'
    },
    type: 'div'
}

let nextUnitOfWork, workInProgressRoot;

function startWorkLoop(deadline) {
    while (nextUnitOfWork && deadline.timeRemaining() >= 0) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }

    !workInProgressRoot ? commitRoot() : window.requestIdleCallback(startWorkLoop);
}

function performUnitOfWork(fiber) {
    beginWork(fiber);
    if (fiber.children) return fiber.children;
    while (fiber !== workInProgressRoot) {
        completeUnitOfWork(fiber);
        if (fiber.sibling) return fiber.sibling;
        fiber = fiber.return;
    }
}

function beginWork(fiber) {
    if (!fiber.stateNode) {
        fiber.stateNode = document.createElement(fiber.type);
    }

    fiber.props && Object.keys(fiber.props).filter((e) => e !== 'children').forEach((e) => {
        fiber.stateNode[e] = fiber.props[e];
    });

    let preFiber;

    fiber.props.children && fiber.props.children.forEach((e, i) => {
        const newFiber = {
            type: e.type,
            props: e.props,
            children: e.children,
            effectTag: 'PLACEMENT',
            return: fiber
        }
        if (i === 0) fiber.children = newFiber;
        else preFiber.sibling = newFiber;
        preFiber = newFiber;
    });
}

function completeUnitOfWork(fiber) {
    const returnFiber = fiber.return;
    if (!returnFiber.firstEffect) {
        returnFiber.firstEffect = fiber.firstEffect;
    }
    if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = fiber.firstEffect;
    }
    returnFiber.lastEffect = fiber.lastEffect;
    if (fiber.effectTag === 'PLACEMENT') {
        returnFiber.lastEffect.nextFiber = fiber;
        returnFiber.lastEffect = fiber;
    }
}

function commitRoot() {
    let currentEffect = workInProgressRoot.firstEffect;
    while (currentEffect) {
        if (currentEffect.effectTag === 'PLACEMENT') {
            currentEffect.return.stateNode.appendChild(currentEffect.stateNode);
        }
        currentEffect = currentEffect.nextEffect;
    }
    workInProgressRoot = null;
}