/*
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-08-01 15:42:28
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-08-01 15:53:44
 * @Description: 茶泡饭的完美代码
 */
const imgs = document.querySelectorAll('img');

function lazy(arr) {
    arr.forEach((e) => {
        if (e.isIntersecting) {
            e.target.setAttribute('src', e.target.getAttribute('data_src'));
            observer.unobserve(e.target);
            console.log('lazy:', e.target);
        }
    });
}

const observer = new IntersectionObserver(lazy);

imgs.forEach((e) => observer.observe(e));