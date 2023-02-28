# 箭头函数转化插件

这一节，我们自己来实现一个将箭头函数转化成普通函数的 babel 插件。

## 目录结构

想着以后这个插件库自己可以不断去完善，而不是简单写一个 demo，所以这里好好将目录结构搭建一下。
这里采用 monorepo 的方式管理项目，项目目录结构：

[仓库地址](https://github.com/candy252324/cxx-babel-plugin.git)
```
├── example
│   ├── index.js     # 测试代码
│   ├── dist.js      # 编译后的测试代码
├── packages         # 插件目录   
│   └── transform-arrow-function  # 箭头函数转换插件
│   │   ├── package.json
│   │   └── lib    
│   │   │  ├── index.js
│   └── xxx-xxx-xxx    # 其它插件（示例）
│   │   ├── package.json
│   │   └── lib    
│   │   │  ├── index.js
├── .babelrc   
├── package.json
```
## 编译前后对比

先看使用官方插件[@babel/plugin-transform-arrow-functions](https://www.npmjs.com/package/@babel/plugin-transform-arrow-functions)编译前和编译后的代码：

```js
// 编译前
const sum = (a, b) => a + b
// 编译后 
const sum = function (a, b) {
  return a + b;
};

```

```js
// 编译前
const sum = (a, b) => {
  console.log(this)
}
// 编译后
var _this = this;
const sum = function (a, b) {
  console.log(_this);
};
```
```js
// 编译前
function a() {
  const sum = () => console.log(this)
}
// 编译后
function a() {
  var _this = this;
  const sum = function () {
    return console.log(_this);
  };
}
```

所以我们要做两件事:
1. 如果没有花括号，补充花括号，并加上 `return` 
2. 如果有 this, 在父级作用域中定义新的变量 `_this`，并将原来的 `this` 替换为 `_this`

## 添加花括号和 return

先看不带花括号和带花括号的 AST 差异：
<img :src="$withBase('/imgs/plugins/babel-plugin-transform-arrow-function.png')" style="transform:scale(0.9)">

从上图可以看到，我们只需要将原本的 `ArrowFunctionExpression` 替换成 `FunctionExpression` ，然后将原本的 body 替换成花括号（ `blockStatement`），花括号里是一个 return （`returnStatement`），return 里是原本的 body（`a+b`）。

如果我们直接通过 `if(node.type!=="BlockStatement"){ node.type===xxx}` 这种方式去操作节点，极不方便而且极容易出错，这里我们借助工具 [@babel/types](https://babeljs.io/docs/babel-types)。
```js
const types=require("@babel/types")
module.exports=()=>{
  return {
    visitor: {
      ArrowFunctionExpression(path) {
        const { node } = path // 我们要操作的是节点，先取到节点
        node.type = 'FunctionExpression' // 将箭头函数改成普通函数
        const body = node.body
        // 如果没有花括号，加上花括号，并添加 return
        if (!types.isBlockStatement(body)) {
          node.body = types.blockStatement([types.returnStatement(body)])
        } 
        hoistFunctionEnv(path)  // this 提升
      },
    },
  }
}
```

以上代码，就已经实现 `const sum = (a, b) => a + b` 转换成 `const sum = function (a, b) {return a + b}` 了。接下来要做的是 this 提升。

## this 提升

实现思路是：
- 基于当前 path 逐级往上查找 this 作用域，直到非箭头函数或顶级作用域为止
- 往 this 作用域中添加代码 `var _this = this`
- 遍历当前 path，找到所有的 this，将其全部替换为 `_this`

```js
// this 提升
function hoistFunctionEnv(path){
  const bindingThis="_this"
  // 查找this作用域
  const thisEnv = path.findParent(
    // 是函数且不是箭头函数 ，或是顶级作用域
    parent => (parent.isFunction() && !parent.isArrowFunctionExpression()) || parent.isProgram()
  )
  // 往 this 作用域中添加  var _this = this
  thisEnv.scope.push({
    id: types.identifier(bindingThis),
    init: types.thisExpression(),
  })
  // 查找当前 path 下所有的 this
  const thisPaths = findThisPaths(path)
  // 将这些 path 中的 this 替换为 _this
  thisPaths.forEach(p => {
    p.replaceWith(types.identifier(bindingThis))
  })
}
// 查找当前 path 下所有的 this
function findThisPaths(path){
  var arr=[]
  path.traverse({
    ThisExpression(p){
      arr.push(p)
    }
  })
  return arr
}
```
至此，完成了这个插件的开发。
当然，还有很多细节未处理，如：每次执行`hoistFunctionEnv`都往 this 作用域中添加了一次` var _this = this`，已经存在名为 `_this` 的变量如何避免冲突等