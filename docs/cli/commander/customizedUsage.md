# 高级用法

### 一、定制help,自定义help信息

`-h` 其实就是通过调用`program.helpInformation()`方法获取帮助信息。那么我们有两种方式来自定义help信息。


方法1：直接改写helpInformation方法内部

``` js
program.helpInformation = () => { 
  return "your help info" 
}
```

方式2： 将`program.helpInformation()`返回空，再去监听--help。（注，program内部实现是继承自EventEmitter事件对象的，很多内容都是通过事件监听的方式实现的）

``` js
program.helpInformation = () => { return "" }
program.on('--help', function () {
  console.log('your help info')
})
```

### 二、实现 debug 模式

通过监听`--debug`,开启debug模式

``` js
// 或写成 program.on('--debug',)
program.on('option:debug',function(){
  console.log('debug',program.debug)  // true or false
  if(program.debug){
    process.env.LOG_LEVEL='verbose'
  }
})
```


### 三、捕获所有未知命令(未注册的命令)

方式1：通过`command:*` 捕获
``` js
program.on('command:*',function(obj){
  console.error('未知的命令',obj[0])
})
```

方式1：通过`arguments` 捕获

``` js
program
  .arguments("<cmd> [options]")
  .description("捕获所有未知命令")
  .action((cmd, options) => {
    console.log(cmd, options)
  })
```

### 三、命令拼接
 
 使用 command 的第二个参数实现命令拼接。（**当没有第二个参数时候，会执行action里的方法，当有第二个参数时，执行拼接后的命令**）。

 如下代码, 添加第二个参数（其实只是一个描述信息）后，当我们在bash中输入`cxxgo install`的时候，  会报错 —— `Error: Cannot find module 'E:\cxxgo\cxxgo-install'`。为什么呢？因为实际是执行了`cxxgo-install`, 而我们没有`cxxgo-install`命令，所以报错了，就是这么神奇！

``` js
program.command("install [name]", '安装包')
```

通过配置`executableFile` 还可以指定最终执行的命令文件，如下代码:

当我们执行`cxxgo install`的时候，实际执行的是 `myxxx`;

当我们执行`cxxgo install init`的时候，实际执行的是 `myxxx init`。

（如果本地没有vue的可执行文件，会报错——`Error: Cannot find module 'E:\cxxgo\myxxx'`。）
``` js
program.command("install [name]", '安装包', {
  executableFile: "myxxx",
})
```










