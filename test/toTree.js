/*
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-07-21 16:41:09
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-07-21 16:49:14
 * @Description: 茶泡饭的完美代码
 */

const list = [{
        id: 1,
        name: '部门A',
        parentId: 0
    },
    {
        id: 2,
        name: '部门B',
        parentId: 0
    },
    {
        id: 3,
        name: '部门C',
        parentId: 1
    },
    {
        id: 4,
        name: '部门D',
        parentId: 1
    },
    {
        id: 5,
        name: '部门E',
        parentId: 2
    },
    {
        id: 6,
        name: '部门F',
        parentId: 3
    },
    {
        id: 7,
        name: '部门G',
        parentId: 2
    },
    {
        id: 8,
        name: '部门H',
        parentId: 4
    }
];

const convert = (arr) => {
    const visited = new Array(arr.length).fill(false);
    const fn = (tmp, pid) => {
        const res = [];
        for (let i = 0; i < tmp.length; i++) {
            if (visited[i]) continue;
            if (tmp[i].parentId === pid) {
                visited[i] = true;
                const obj = {
                    ...tmp[i]
                };
                obj.children = fn(tmp, obj.id);
                res.push(obj);
            }
        }
        return res;
    }
    return fn(arr, 0);
}

console.log(convert(list));