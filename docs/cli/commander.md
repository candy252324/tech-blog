# commander

commander常用命令

commander注册命令的两种方式：

1.

2.子命令：cxxgo service start

- 高级用法1：强制用户必须输入命令（捕获所有输入）

- 高级用法2：命令拼接 相当于执行immoc-cli-install


### 高级定制help,自定义help信息
方法1： -h 其实就是通过调用program.helpInformation()方法获取帮助信息，那么我么可以想把他返回空，再去监听--help时间（注，program是继承自EventEmitter事件对象的，很很多内容都是通过事件监听的方式实现的）
```
program.on('--help',function(){
  console.log('your help info')
})
```

方法2：直接改写helpInformation方法内部
```
program.helpInformation=function(){}
```


### 高级定制, 实现debug 模式
``` js
// 或 program.on('--debug',)等价
program.on('option:debug',function(){
  console.log('debug',program.debug)
  if(program.debug){
    process.env.LOG_LEVEL='verbose'
  }
})
```