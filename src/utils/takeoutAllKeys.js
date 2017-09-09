/**
 * Created by kurry on 2017/8/24.
 */

/**
 * array: 是一个数组
 * key: 需要操作的数组中对象的某个键名
 * */

export function takeoutAllKeys(array,key){//获取指定名称的cookie的值

  let listString = '';
  array.map((item)=>{
    //第一个为空值时，前面不加逗号，不为空了加逗号
    listString == '' ? listString += item[key] : listString += ` / ${item[key]}`
  });
  return listString
}
