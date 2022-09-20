# browserslist

package.json 中增加 browserslist 配置。

这里配置目标浏览器为：全球用户份额大于 1% 的浏览器 和 所有浏览器的最新两个版本，但是不包括版本 <= 8 的 ie。请根据实际需求配置。


```json
// package.json
{
 "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}
```


[查看浏览器版本和用户占比](https://caniuse.com/usage-table)。


# browserslist 作用

browserslit 用特定的语句来查询浏览器列表。

可以配置在 package.json 中(（推荐），也可以写单独的配置文件（.borwserslistrc），不能两个都配置，会报错。

配置好后，当我们使用一些 npm 包（babel，Autoprefixer，postcss-preset-env 等）的时候，这些包会根据配置列表生成对应的兼容代码。

语法及含义：

**根据用户份额查询：**

- `> 5%`: 在全球用户份额大于 5% 的浏览器

- `> 5% in CN`: 在中国用户份额大于 5% 的浏览器

**根据最新浏览器版本：**
- `last 2 versions`: 所有浏览器的最新两个版本
- `last 2 Chrome versions`: Chrome 浏览器的最新两个版本

**不再维护的浏览器**
- `dead`: 官方不再维护已过两年，比如 IE10

**浏览器版本号**
- `Chrome > 90`: Chrome 大于 90 版本号的浏览器(不区分大小写)
- `not ie <=8`: 非 ie <= 8的版本（注：真实配置的时候 not 语句不能写在开头）


### 查询语法
- 并集（or或者,），如 `> 1% or last 2 versions` 或 `> 1%, last 2 versions`；
- 交集（and），如 `> 1% and last 2 versions`；
- 取反（not），如 `not > 1%`；
- defaults：> 0.5%, last 2 versions, Firefox ESR, not dead；

### 使用示例
- `npx browserslist` 列出当前配置文件支持的浏览器和对应的版本
- `npx browserslist "chrome >90 and chrome <100"`  将返回 chrome [91,99]之前的所有版本
- `npx browserslist "last 2 Chrome versions" --coverage` 统计目标浏览器覆盖率



