

// /**
//  * 排序数组或者对象
//  * by
//  * @param data 数组或对象
//  * @param filed 需要排序的子键, 该参数可以是字符串, 也可以是一个数组
//  * @param rev 排序方式, true:降序, false|undefined:升序
//  * @returns {*} 返回排序后的数组或者对象
//  *
//  * 注意: 对于对象的排序, 如果使用console.log打印对象的显示可能和排序结果不一致,
//  *  其键会被浏览器以字母顺序排序显示,但在for循环中则为正确的排序顺序
//  */
//用法 data.sort(sortBy('filed', false, parseInt));
export function sortBy(filed,rev,primer){
  rev = (rev) ? -1 : 1;
  return function (a, b) {
    a = a[filed];
    b = b[filed];
    if (typeof (primer) != 'undefined') {
      a = primer(a);
      b = primer(b);
    }
    if (a < b) { return rev * -1; }
    if (a > b) { return rev * 1; }
    return 1;
  }
}

