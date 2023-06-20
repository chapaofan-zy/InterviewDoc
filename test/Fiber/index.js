/*
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-06-15 15:34:51
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-06-20 11:01:59
 * @Description: 茶泡饭的完美代码
 */
import React from './React.js';
import {
    startWorkLoop
} from './ReactDOM.js'

const element = React.createElement('div', {
    key: '0',
    ref: 'r',
    id: 'parent'
}, React.createElement('div', {
    title: 'son',
    id: 'son'
}));

console.log(element);

const rootFiber = {
    stateNode: document.querySelector('#root'),
    type: 'div',
    props: {
        id: 'root',
        children: [element]
    }
}

startWorkLoop(rootFiber);