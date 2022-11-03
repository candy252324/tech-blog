# 原理简述

先抛结论： **脚手架的本质是一个操作系统的客户端**，只是它没有图形界面。

这里以 windows 操作系统下全局安装的 `vue`命令为例来讲解脚手架的原理：

### 1. 下载包

`npm install vue -g`的时候，npm 会把 vue 包下载到在`C:\Users\xxx\AppData\Roaming\npm\node_modules`目录下

<img :src="$withBase('/imgs/cli/principle-path.png')">

### 2. 根据 package.json 中的配置生成软链接

解析包的时候，如果发现 package.json 中存在 bin 配置，则生成软链接，（注：可以在 bash 上执行`where vue`查看软链接所在路径）

```js
// C:\Users\cjh\AppData\Roaming\npm\node_modules\@vue\cli\package.json
{
  "name": "@vue/cli",
  "bin": {
    "vue": "bin/vue.js"
  }
},
```

<img :src="$withBase('/imgs/cli/soft-connection.png')" style="transform:scale(0.9);">

### 3. 软链接中指定目标执行文件的位置

我们用编辑器打开这个软件接（路径 C:\Users\cjh\AppData\Roaming\npm\vue）, 可以看到如下内容，其中 if else 里指定了不同情况下目标执行文件的位置。

```sh
#!/bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")

case `uname` in
    *CYGWIN*) basedir=`cygpath -w "$basedir"`;;
esac

if [ -x "$basedir/node" ]; then
  "$basedir/node"  "$basedir/node_modules/@vue/cli/bin/vue.js" "$@"
  ret=$?
else
  node  "$basedir/node_modules/@vue/cli/bin/vue.js" "$@"
  ret=$?
fi
exit $ret

```

### 4. 通过 #!/usr/bin/env node 指定运行环境

打开目标执行文件 vue.js 文件，可以看到第一行写着 `#!/usr/bin/env node`。

```js
// C:\Users\cjh\AppData\Roaming\npm\node_modules\@vue\cli\bin\vue.js
#!/usr/bin/env node
```

这行代码有什么用呢？

**我们在 bash 中执行`/usr/bin/env`，可以看到打印出了所有的环境变量。 而`#!/usr/bin/env node`的作用就是指定 vue.js 的运行环境为 node！**

这里我们可以做一个小测试，在桌面上新建一个 test.js 文件，并在 bash 中输入`./test.js`，发现报错了。

```bash
echo 'console.log(123)' > test.js
./test.js  # 报错
```

但是如果我们在在首行加一行 `#!/usr/bin/env node`，再执行`./test.js`，发现打印了 123！

注：这里执行`./test.js`等价于`node ./test.js`，同时等价于 `/usr/bin/env node ./test.js`。

### 5. 总结

当我们执行 vue 相关命令的时候，操作系统会通过`where vue`找到 vue 软连接的路径，然后通过软链接找到目标文件(即 vue.js)的路径，再在指定环境（node）执行这个文件。
