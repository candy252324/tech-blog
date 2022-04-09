# 高级定制

先看try-catch 图片。在之前的try catch 里执行执行 registerCommand()

先要在core/cli目录下安装commander -s
registerCommand 函数做的事情：
```js
function registerCommand(){
 program
  .name(Object.keys(pkg.bin)[0])
  .usage('<command> [options]')
  .version(pkg.version)
  .option('-d,--debug','是否开始debug模式',false)

// 注册init命令
program
  .command('init [projectName]')
  .option('-f, --force','是否强制初始化项目')
  // .action((projectName,cmdObj)=>{
  //   // 使用lerna在commands目录下创建一个init包
  //   console.log('init',projectName,cmdObj.force)
  // })
  .action(init)  // 改成这样，init 方法中能直接拿到 projectName,cmdObj

  // 开启debug模式
  
  //使用`command:*`对未知命令进行监听

  // 处理没输入命令的情况,输出帮助文档
  if(program.args && program.args.length<1){
    program.outputHelp()
    console.log(); // 打印一行空行，好看些
  }
  program.parse(process.argv) // 解析参数

}

```


问题： 
1.所有的包都集中在cli中，当命令较多的时候，会减慢cli的安装速度 
2.每个bu 的init命令可能都不同，需要加载不同模块，需要动态加载



