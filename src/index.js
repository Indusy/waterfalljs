class Waterfall {
  columnWidth;
  gap;
  waterfallGrid;
  waterfallItems;
  get colCount() {
    return this.computeColCount();
  };
  constructor(options) {
    const { grid, items, columnWidth, gap } = options;
    this.columnWidth = columnWidth | 200;
    this.gap = gap | 20;
    this.waterfallGrid = document.querySelectorAll(grid)[0];
    this.waterfallItems = document.querySelectorAll(items);
    document.documentElement.style.setProperty('--grid-width', `${this.columnWidth}px`);
    document.documentElement.style.setProperty('--item-gap', `${this.gap}px`);
    (() => {
      this.putItems();
    })();
    window.addEventListener('resize', () => {
      this.putItems();
    });
  }
  computeColCount() {
    const gridRects = this.waterfallGrid.getClientRects()[0];
    const itemRects = {
      width: this.columnWidth,
      gap: this.gap,
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
  };
  setItemPosition(ele, left, top) {
    ele.style.setProperty("position", "absolute");
    ele.style.setProperty("left", `${left}px`);
    ele.style.setProperty("top", `${top}px`);
  }
  putItems() {
    let colCount = this.computeColCount();
    let leftStartPosition =
      (this.waterfallGrid.clientWidth - (colCount * this.columnWidth + (colCount - 1) * this.gap)) / 2;
    let colHeights = new Array(colCount).fill(0); // 记录每一列的高度
    this.waterfallItems.forEach((ele, k) => {
      let top = 0;
      let left = 0;
      // 如果元素属于第一排，直接排列
      if (k < colCount) {
        left = leftStartPosition + k * (this.columnWidth + this.gap);
        top = colHeights[k];
        // 更新当前列高度
        colHeights[k] += ele.clientHeight + this.gap;
        this.setItemPosition(ele, left, top);
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
      left = leftStartPosition + willAppendNewItemCol * (this.columnWidth + this.gap);
      // 更新当前列高度
      colHeights[willAppendNewItemCol] += ele.clientHeight + this.gap;
      this.setItemPosition(ele, left, top);
    });
  }
}