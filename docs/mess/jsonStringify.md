# JSON.stringify 循环引用问题

有如下代码：
``` js
var obj1={name:"cxx"}
var obj2={age:18}
obj1.a=obj2
obj2.b=obj1
var str=JSON.stringify(obj1)
```
产生如下图报错：
<img :src="$withBase('/imgs/mess/json-stringify.png')">

原因是，代码中存在循环引用，JSON.stringify 会一直去序列化所有对象，包括引用的对象，一直往复会导致爆栈。JSON.stringify 处理方式是遇到循环引用就直接抛出异常。

解决方法，利用JSON.stringify的第二个参数：
``` js
function stringifyJSON(obj){
  let cache=[]
  var str=JSON.stringify(obj,(key,value)=>{
      if(Object.prototype.toString.call(value)==="[object Object]"){
          if(cache.includes(value)) return
          cache.push(value)
      }
      return value
  })
  return str
}
```
这个时候我们就能得到想要的结果了：
```js
// 以下代码输出：{"name":"cxx","a":{"age":18}}
console.log(stringifyJSON((obj1)))  
```
