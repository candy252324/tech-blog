# eslint --init


- 安装依赖： `yarn add eslint -D`

- 初始化：`eslint --init`

执行`eslint --init`后会根据用户选项在目录下生成配置文件。

比如这里`Which framework does your project use?` 我选的是 `vue`，`Does your project use TypeScript?` 我选的是`Yes`，于是 `package.json` 中自动给我添加了 `eslint-plugin-vue`、`@typescript-eslint/eslint-plugin` 和  `@typescript-eslint/parser` 依赖。

>本项目相关依赖版本为：  
"@typescript-eslint/eslint-plugin": "^5.39.0"  
"@typescript-eslint/parser": "^5.39.0"  
"eslint": "^8.25.0"  
"eslint-plugin-vue": "^9.6.0"  

同时 `.eslintrc.js` 配置文件中也自动添加了对应了的 `extends`和`plugin`。

以下是初始化生成的`.eslintrc.js`文件。

```js
module.exports = {
  "env": {
      "browser": true,
      "es2021": true
  },
  "extends": [
      "eslint:recommended",
      "plugin:vue/vue3-essential",
      "plugin:@typescript-eslint/recommended"
  ],
  "overrides": [
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module"
  },
  "plugins": [
      "vue",
      "@typescript-eslint"
  ],
  "rules": {
  }
}
```

这个时候如果我们写入如下测试代码
```js
// index.js
const a = 100
a = 80
```
然后运行 `eslint ./src/index.js`，产生如下报错，说明 eslint 配置已经生效了：

<img :src="$withBase('/imgs/zeroToOne/eslint-test.png')"/>

另外，配合 vscode 的 eslint 插件，可以看到有问题的代码会自动标红。

