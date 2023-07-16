// 快速排序
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    const left = [],
        right = [];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[0]) left.push(arr[i]);
        else right.push(arr[i]);
    }
    return quickSort(left).concat(arr[0], quickSort(right));
}

const arr = [4, 6, 1, 7, 2, 4];
console.log(quickSort(arr));