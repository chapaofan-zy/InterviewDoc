## 排序算法

#### 复杂度

![复杂度](https://pic2.zhimg.com/v2-1348d2cc27ef9593db98cacfc076d561_r.jpg)

### 快速

```js
// 空间复杂度 nlogn
const quickSort1 = (arr) => {
  if (arr.length <= 1) return arr;
  const left = [],
    right = [];
  for (let i = 1; i < arr.length; i++) {
    arr[i] > arr[0] ? right.push(arr[i]) : left.push(arr[i]);
  }
  return quickSort(left).concat(arr[0], quickSort(right));
};

// 空间复杂度 logn
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
```

---

### 选择

```js
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
};
```

---

### 冒泡

```js
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
};
```

---

### 插入

```js
const insertSort = (arr) => {
  if (arr.length <= 1) return arr;
  const res = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    let j = 0;
    while (arr[i] > res[j]) j++;
    res.splice(j, 0, arr[i]);
  }
  return res;
};
```
