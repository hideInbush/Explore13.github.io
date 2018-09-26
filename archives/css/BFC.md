# BFC和IFC

## BFC（块格式化上下文）
> 块格式化上下文（Block Formatting Context，BFC）是Web页面的可视化CSS渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域

## 如何创建BFC：
* 根元素或包含根元素的元素
* 浮动元素（元素的`float`不是`none`）
* 绝对定位元素（元素的`position`为`absolute`或`fixed`）
* 行内块元素（元素的`display`为`inline-block`）
* 表格单元格
* 表格标题
* 匿名表格单元格元素
* `overflow`值不为`visible`的块元素
* `display`值为`flow-root`的元素
* `contain`值为`layout`、`content`或`strict`的元素
* 弹性元素
* 网格元素
* 多列容器
* `column-span`为all的元素

## BFC布局规则
* 内部的Box会在垂直方向，一个接一个地放置。
* Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
* 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
* BFC的区域不会与float box重叠。
* BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
* 计算BFC的高度时，浮动元素也参与计算

## 相关BFC应用场景
1. 自适应两栏布局
2. 清除内部浮动
3. 防止垂直margin折叠


