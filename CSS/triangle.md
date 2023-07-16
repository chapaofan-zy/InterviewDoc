<!--
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-07-13 18:55:32
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-07-13 19:01:55
 * @Description: 茶泡饭的完美代码
-->

## 如何画三角形

```css
.triangle {
  width: 0;
  height: 0;
  border: solid 0 10px 20px;
  border-color: transparent transparent rgba(0, 0, 0, 1);
}
```

### 空心三角形

计算下伪元素的top和left
```css
.triangle {
  width: 0;
  height: 0;
  border: solid 0 10px 20px;
  border-color: transparent transparent rgba(0, 0, 0, 1);
}

.triangle::after {
  width: 0;
  height: 0;
  border: solid 0 8px 16px;
  border-color: transparent transparent rgba(255, 255, 255, 1);
  position: absolute;
  top: ?;
  left: ?;
}
```
