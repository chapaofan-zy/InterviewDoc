<!--
 * @Author: “chapaofan-zy” “1095004630@qq.com”
 * @Date: 2023-07-13 19:04:55
 * @LastEditors: “chapaofan-zy” “1095004630@qq.com”
 * @LastEditTime: 2023-07-13 19:19:23
 * @Description: 茶泡饭的完美代码
-->

## Flex

### 容器属性

```css
.container {
  flex-direction: row | row-reverse | column | column-reverse;
  flex-wrap: nowrap | wrap | wrap-reverse;
  justify-content: flex-start | flex-end | center | space-between | space-around; /* 主轴 */
  /* 单行用align-items，多行用align-content */
  align-items: flex-start | flex-end | center | baseline | stretch; /* 交叉轴 */
  align-content: flex-start | flex-end | center | space-between | space-around |
    stretch; /* 多根轴线 */
}
```

### 容器成员属性

```css
.item {
  order: <integer>; /* 元素顺序 */
  /* 以下在不换行，有剩余空间的情况下 */
  flex-grow: <number>; /* 放大比例，默认为0不放大，如果所有item均为1，则等分剩余空间 */
  flex-shrink: <number>; /* 空间不足，等比缩小，默认值为1，为0时不缩小，同时空间有剩余时不生效 */
  flex-basis: <length> | auto; /* 在主轴上的初始尺寸，默认值为auto，即项目本来大小；当设置为0，根据内容撑开 */
  flex: none | [ < "flex-grow" > < "flex-shrink" >? || < "flex-basis" >]; /* 以上三个的缩写，默认值0 1 auto */
  /* 
    flex: 1 = flex: 1 1 0
    flex: auto = flex: 1 1 auto
    flex: none; 固定尺寸不伸缩 
  */
  align-self: auto | flex-start | flex-end | center | baseline | stretch; /* 允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性 */
}
```
