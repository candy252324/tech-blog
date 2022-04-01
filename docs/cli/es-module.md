# node 支持ES Module 的方法

### 方式一：使用webpack，配个entry,output,然后打包就好了

但是如果引用了一些node内置库，如fs,path,打包后仍然会执行失败，因为webpack的target默认是web, 需要改为node(webpack会提供垫片)
``` js
// webpack.config.js
{
  target:'node'
}
```


- 配置babel-loader(因为低版本的node不会转化async await 语法)
`npm i -D babel-loader @babel/core @babel/preset-env`

``` js
// webpack.config.js
{
  modules:{
    rules:[
      {
        test:/\.js$/,
        exclude:/(node_modules|dist)/,
        use:{
          loader:'babel-loader',
          // 可以直接在这里配options，也可以配置.babelrc文件
          // @babel/preset-env 是babel默认的转化集
          options:{
            presets:['@babel/preset-env'],
            plugins:[
              [
                '@babel/plugin-transform-runtime',
                {
                  corejs:3,  // corejs 版本
                  'regenerator':true, //引入 regeneratorRuntime
                  useESModules:true,
                  helpers:true
                }
              ]
            ]
          }
        }
      }
    ]
  }
}
```
注：即使把exclude去掉后，代码中一个async await 也没有，运行后依然报错了，报错`regeneratorRuntime is not defined` ，这里regeneratorRuntime是async await 构建后生成的方法，但是它是以一种垫片的形式加入进去的，由于我们的垫片方法没有加入到我们的代码里，解决方法`npm i -D @babel/plugin-transform-runtime`,然后配置到plugin属性中。
仍然报错：用的corejs3版本，得装corejs3库，`npm i -D @babel/runtime-corejs3`

### 方法二 通过node原生支持
- 文件名必须改为.mjs
- 使用exprot导出，import加载.mjs
- node 8开始是实验属性，用的时候需要加参数`node --experimental-modules index.js`
- node 14开始不需要加参数

`nvm ls` 查看本地所有node版本

`nvm ls-remote` 查看远程所有node版本

`nvm install 14.15.2` 安装指定版本
