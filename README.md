# waterfalljs
瀑布流

## 使用

`yarn dev` 编译

引入 lib/waterfalljs.js

```javascript
new waterfall({
    grid: '.__waterfall-grid',   // string, 必选，grid 容器选择器
    items: '.__waterfall-item',   // string, 必选，item 格子选择器
    columnWidth: 200,  // number, 可选，item 宽度，默认值 200
    gap: 20,  // number,可选，item 间隔，默认值 20
});
```