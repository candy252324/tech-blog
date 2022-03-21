# 原理简述

先抛结论： **脚手架的本质是一个操作系统的客户端。** 

这里以windows操作系统下 `vue`命令为例来讲解脚手架的原理： 

#### 1. 下载

`npm install vue -g`的时候，npm会把vue包下载到在`C:\Users\xxx\AppData\Roaming\npm\node_modules`目录下

<img :src="$withBase('/imgs/principle-path.png')">


#### 2. 解析

解析包的时候，如果发现package.json中存在bin配置，则生成软链接，（注：可以在bash上执行`where vue`查看软链接路径）


``` js
// C:\Users\cjh\AppData\Roaming\npm\node_modules\@vue\cli\package.json
{
  "name": "@vue/cli",
  "bin": {
    "vue": "bin/vue.js"
  }
},
```
### 3. 通过 #!/usr/bin/env node指定运行环境

打开vue包里的vue.js文件，可以看到第一行写着 `#!/usr/bin/env node`。

``` js
// C:\Users\cjh\AppData\Roaming\npm\node_modules\@vue\cli\bin\vue.js
#!/usr/bin/env node
```

这行代码有什么用呢？

我们在bash中执行`/usr/bin/env`，可以看到打印出了所有的环境变量。 而`#!/usr/bin/env node`的作用就是指定vue.js的运行环境为node。


这里我们可以做一个小测试，在桌面上新建一个test.js文件，并在bash中输入'./test.js', 发现报错了。
``` bash
echo 'console.log(123)' > test.js
./test.js
```
但是如果我们在在首行加一行 `#!/usr/bin/env node`，再执行`./test.js`,发现打印了123！

这里执行`./test.js`等价于`node ./test.js`，同时等价于 `/usr/bin/env node ./test.js`

### 4. 当我们执行vue相关命令的时候，操作系统会通过`where vue`找到vue的路径，并执行这个文件
