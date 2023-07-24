/*
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-07-24 15:49:09
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-07-24 16:45:09
 * @Description: 茶泡饭的完美代码
 */
const genArr = (n) => {
    return new Array(n).fill().map(() => Math.floor(Math.random() * 100));
}

// 快速
const quickSort1 = (arr) => {
    if (arr.length <= 1) return arr;
    const left = [],
        right = [];
    for (let i = 1; i < arr.length; i++) {
        arr[i] > arr[0] ? right.push(arr[i]) : left.push(arr[i]);
    }
    return quickSort1(left).concat(arr[0], quickSort1(right));
}

const quickSort2 = (arr, l, r) => {
    if (l >= r) return arr;
    let left = l,
        right = r;
    const p = arr[left];
    while (left < right) {
        while (arr[right] >= p && right > left) right--;
        arr[left] = arr[right];
        while (arr[left] <= p && left < right) left++;
        arr[right] = arr[left];
    }
    arr[left] = p;
    quickSort2(arr, l, left - 1);
    quickSort2(arr, left + 1, r);
    return arr;
};

// 选择
const selectSort = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[i]) {
                const tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        }
    }
    return arr;
}

// 冒泡
const bubbleSort = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
    return arr;
}

// 插入
const insertSort = (arr) => {
    if (arr.length <= 1) return arr;
    const res = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
        let j = 0;
        while (arr[i] > res[j]) j++;
        res.splice(j, 0, arr[i]);
    }
    return res;
}

let arr = genArr(10);
console.log('quick1\n', quickSort1(arr));
arr = genArr(10);
console.log('quick2\n', quickSort2(arr, 0, arr.length - 1));
arr = genArr(10);
console.log('select\n', selectSort(arr));
arr = genArr(10);
console.log('bubble\n', bubbleSort(arr));
arr = genArr(10);
console.log('insert\n', insertSort(arr));