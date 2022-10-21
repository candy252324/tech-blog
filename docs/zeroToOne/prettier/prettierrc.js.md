# 配置文件

Prettier 的配置文件`.prettierrc.js`，[所有配置参数看这里](https://www.prettier.cn/docs/options.html)。


以下是一个简单示例：

```js
// .prettierrc.js
module.exports = {
  semi: false,  // 结尾是否需要分号
  singleQuote: true,  // 使用单引号而非双引号
  tabWidth: 2,   // tab 是几个空格
  trailingComma: 'all',  // 是否需要尾逗号，
  bracketSpacing: true,  // 数组括号[] 和 对象括号{} 内侧是需要空格
  printWidth: 120,  // 超过多少行换行，默认80
  endOfLine: 'auto',  // 结尾是 \n \r \n\r auto
  // 是否删除标签内左右两侧的空格，如 <div> hello </div>，'strict'：保留空格， 'ignore'：删除空格
  htmlWhitespaceSensitivity: 'ignore',
  arrowParens: 'avoid',  // 箭头函数参数只有一个时是否要有圆括号，'avoid'：不需要，'always'：需要
}
```

有了配置文件之后，运行 `prettier --write ./xxx/xxx.ext`，就可以根据配置对代码进行 prettier 了。




