# esprima 三件套使用示例

解析器有很多种，本节只演示 `esprima` 解析器三件套的使用示例，作用是将代码 `function a(){}` 转化成 `function b(){}`。

先看一下代码`function a(){}`在`esprima`解析器下的解析结果。

<img :src="$withBase('/imgs/plugins/esprima-example.jpg')">

现在开始编码，先安装三件套:
 ```shell
 npm inatall esprima estraverse escodegen 
 ```
其实从包名也能大概看出包的作用：解析 => 转化 => 生成 。

```js
const esprima=require("esprima")
const estraverse = require('estraverse')
const escodegen = require('escodegen')

let code =`function a(){}`  

const ast=esprima.parseScript(code)  // 将源代码解析成 ast
// 遍历 ast
estraverse.traverse(ast, {
  enter(node) {
    console.log("enter:",node.type)
    // 判断节点类型，并更改节点
    if(node.type==="FunctionDeclaration"){
      node.id.name="b"
    }
  },
  leave(node) {
    console.log("leave:",node.type)
  },
})
const result = escodegen.generate(ast)  // 重新将 ast 转换成 js
console.log(result)  // function b(){}
```
以上代码，就已经完成了代码 `function a(){}` 到 `function b(){}`的转换。

上述代码中的 `enter` 和 `leave` 是节点访问的钩子，一个是进入节点，一个是离开节点，遍历原则是先进先出，依次遍历，打印结果如下：
```
enter: Program   // 进入根节点
enter: FunctionDeclaration  // 进入 FunctionDeclaration 节点
enter: Identifier  // 进入 Identifier 节点
leave: Identifier  // Identifier 遍历结束，离开
enter: BlockStatement // 开始遍历 BlockStatement 节点
leave: BlockStatement  // BlockStatement 节点遍历结束，离开
leave: FunctionDeclaration  // 离开
leave: Program  // 离开
```


