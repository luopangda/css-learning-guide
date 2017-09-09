/**
 * Created by kurry on 2017/4/9.
 */

export function getcookie(objname){//获取指定名称的cookie的值
  let arrstr = document.cookie.split("; ");
  for(let i = 0;i < arrstr.length;i ++){
    let temp = arrstr[i].split("=");
    if(temp[0] == objname) return unescape(temp[1]);
  }
}

export function setcookie(c_name,value,expiredays) {
  let exdate=new Date();
  exdate.setSeconds(exdate.getSeconds() + expiredays);
  document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())

}
