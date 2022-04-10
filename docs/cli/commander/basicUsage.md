# 基本使用

### 一、简单示例

``` bash
npm i commander -S
```
``` js
const commander = require('commander')
const program = commander.program   // commander 实例
program
  .name("cxxgo")
  .version('1.0.3')
  .usage("<command> [options]")
  .option('-d --debug', "是否开启debug模式", false)  // 配置debug选项，设置默认值为false
  .option('-e --envName <envName>', "获取环境变量名称")

  // 处理没输入命令的情况,输出帮助文档
  if(program.args && program.args.length<1){
    program.outputHelp()
    console.log(); // 打印一行空行，好看些
  }

program.parse(process.argv)  // 传入解析参数，必须写在最后面
```
基于以上配置，bash种输入`cxxgo` 或 `cxxgo --help`，输出结果如下图（其中`--version` 和`--help`是commander默认选项）：

<img :src="$withBase('/imgs/cli/commander/basic-usage.png')" style="transform:scale(0.8);">


### 二、注册命令

#### 方式1：调用实例的 command 方法注册命令：

``` js
const commander = require('commander')
const program = commander.program   // commander 实例
program
  .command('init <projectName>')
  .option("-f --force", "是否强制初始化项目")
  .action((projectName, cmdObj) => {
    console.log(projectName)  
    console.log(cmdObj)
  })
program.parse(process.argv)
```

基于以上代码，在bash中输入 `cxxgo init hello -f` ,打印如下图:
<img :src="$withBase('/imgs/cli/commander/register-commander.png')" style="transform:scale(0.8);">



#### 方式2：addCommand, 注册子命令

`cxxgo service start 3000`

`cxxgo service stop`

``` js
const commander = require('commander')
const program = commander.program   // commander 实例

//注册子命令service
const service = new commander.Command('service')
service
  .command("start [port]")
  .description("start service at some port")
  .action((port) => {
    console.log(port)
  })
service.command("stop")
  .description("stop service")
  .action(() => {
    console.log("stop service")
  })
program.addCommand(service)
program.parse(process.argv)
```



### 三、常用属性方法

- `isDefault` 设置为默认命令, 当输入一个未注册的命令时，会默认执行这个命令，不会被 `command:*` 捕获 
- `hidden: true`  命令不会打印在帮助信息里
-  `.alias('i')`  设置别名







