const waterfallGrid = document.querySelectorAll(".__waterfall-grid")[0];
const waterfallItems = document.querySelectorAll(".__waterfall-item");
let colCount = computeColCount();
window.onresize = function () {
  putItems();
};

putItems();

function computeColCount() {
  const gridRects = waterfallGrid.getClientRects()[0];
  const itemRects = {
    width: 200,
    gap: 20,
  };
  let width = gridRects.width;
  let tmpWidth = 0;
  let count = 0;
  if (tmpWidth + itemRects.width <= width) {
    count++;
    tmpWidth += itemRects.width;
  }
  while (tmpWidth + itemRects.width + itemRects.gap <= width) {
    count++;
    tmpWidth = tmpWidth + itemRects.width + itemRects.gap;
  }
  return count;
}

function setItemPosition(ele, left, top) {
  ele.style.setProperty("position", "absolute");
  ele.style.setProperty("left", `${left}px`);
  ele.style.setProperty("top", `${top}px`);
}

function putItems() {
  let colCount = computeColCount();
  let leftStartPosition =
    (waterfallGrid.clientWidth - (colCount * 200 + (colCount - 1) * 20)) / 2;
  let colHeights = new Array(colCount).fill(0); // 记录每一列的高度
  waterfallItems.forEach((ele, k) => {
    let top = 0;
    let left = 0;
    // 如果元素属于第一排，直接排列
    if (k < colCount) {
      left = leftStartPosition + k * (20 + 200);
      top = colHeights[k];
      // 更新当前列高度
      colHeights[k] += ele.clientHeight + 20;
      setItemPosition(ele, left, top);
      return;
    }

    let willAppendNewItemCol = -1; // 用于记录将要更新哪一列
    let minHeight = Infinity; // 用于找出最短列的中间变量
    for (let i = 0; i < colCount; i++) {
      //查找最短列
      if (minHeight > colHeights[i]) {
        willAppendNewItemCol = i;
        minHeight = colHeights[i];
      }
    }
    // 计算位置
    top = colHeights[willAppendNewItemCol];
    left = leftStartPosition + willAppendNewItemCol * (200 + 20);
    // 更新当前列高度
    colHeights[willAppendNewItemCol] += ele.clientHeight + 20;
    setItemPosition(ele, left, top);
  });
}
