/*
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-06-15 15:25:14
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-06-20 10:40:39
 * @Description: 茶泡饭的完美代码
 */
function createElement(type, config, children) {
    const props = {};
    const key = config.key ? config.key : null;
    const ref = config.ref ? config.ref : null;
    Object.keys(config).filter((k) => k !== 'key' || 'ref').forEach((k) => {
        props[k] = config[k];
    });
    if (arguments.length === 3) props.children = [children];
    else {
        const arr = [];
        for (let i = 2; i < arguments.length; i++) {
            arr.push(arguments[i]);
        }
        props.children = arr;
    }
    return {
        $$typeof: 'REACT_TYPE',
        type,
        ref,
        props,
        key
    }
}

export default {
    createElement
}