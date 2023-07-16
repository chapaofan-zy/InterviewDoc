const ul = document.querySelector('ul');

const fragment = document.createDocumentFragment();

new Array(5).fill().forEach((e, i) => {
    const li = document.createElement('li');
    li.key = i;
    li.innerText = `第${i}个`;
    fragment.appendChild(li);
});

ul.appendChild(fragment);

const log = (node) => {
    console.log(node.key);
}

ul.addEventListener('click', (e) => {
    if (e) {
        log(e.target);
    }
});