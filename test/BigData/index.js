const box = document.querySelector('.box');
const input = document.querySelector('.input');
const genBtn = document.querySelector('.genData');
const insert = document.querySelector('.insert');

const arr = [];

genBtn.addEventListener('click', () => {
    const n = input.value;
    for (let i = 0; i < n; i++) arr.push(i);
});

const len = [];

function genArr(deadline, gap) {
    while (deadline.timeRemaining() > 0 && arr.length) {
        const tmp = document.createDocumentFragment();
        for (let i = 0; i < gap; i++) {
            if (!arr.length) break;
            const node = document.createElement('div');
            node.innerText = arr.shift();
            tmp.appendChild(node);
        }
        len.push(tmp);
    }
    window.requestAnimationFrame(insertNode);
    window.requestIdleCallback((d) => genArr(d, gap));
}

function insertNode() {
    if (!len.length) return;
    box.appendChild(len.shift());
    window.requestAnimationFrame(insertNode);
}

insert.addEventListener('click', () => window.requestIdleCallback((d) => genArr(d, 100)));