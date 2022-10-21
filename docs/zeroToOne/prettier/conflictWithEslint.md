# 与 ESlint 规则产生了冲突

比如我这里配置了 `prettier` 的 `htmlWhitespaceSensitivity` 规则为 `ignore`，含义是忽略 `html` 标签内的左右空格。

```js
// .prettierrc.js
module.exports = {
  htmlWhitespaceSensitivity: "ignore",
};
```

如：

```html
<div>hello</div>
```

它将被 prettier 成

```html
<div>hello</div>
```

而 ESlint 插件[`eslint-plugin-vue`](https://github.com/vuejs/eslint-plugin-vue)中有一条规则[`vue/singleline-html-element-content-newline`](https://eslint.vuejs.org/rules/singleline-html-element-content-newline.html)，该规则的含义是 html 中单行元素的内容前后强制换行，即它输出的结果将是这样的：

```html
<div>hello</div>
```

这样就产生了冲突。如何解决呢？

**方案 1：**
在遇到冲突的时候关闭对应的 ESlint 规则或者修改对应的 prettier 规则：

```js
// .eslintrc.js
module.exports = {
  extends: [
    "plugin:vue/vue3-recommended", // eslint-plugin-vue 提供的 rules 规则合集
  ],
  rules: {
    "vue/singleline-html-element-content-newline": 0, // 与 prettier htmlWhitespaceSensitivity 规则冲突
  },
};
```

**方案 2：**
使用 [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier#readme)，关闭 ESlint 中所有不必要或可能与 prettier 冲突的规则。

`yarn add eslint-config-prettier -D`

```js
// .eslintrc.js
module.exports = {
  extends: [
    "some-other-config-you-use", // 其它扩展
    "prettier", // 即 eslint-config-prettier，用于关闭 ESlint 中所有不必要或可能与 prettier 冲突的规则。确保把它放在最后，这样它就有机会覆盖其他配置
  ],
};
```

这样一来，ESlint 不会再对代码风格类的问题进行检查，所有的代码风格规则都写在 `.prettierrc` 中吧！

**方案 3：**
使用[eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier#readme)，这个插件可以让你在 eslint 中写 prettier 规则，官方建议将这个插件和方案 2 中的 `eslint-config-prettier` 配合起来用。

但是这样有一个缺陷，由于 IDE 中的插件只会读取 `.prettierrc`，而不会读取 ESlint 中的 prettier 配置，这将会导致不一致的体验。

> Note: While it is possible to pass options to Prettier via your ESLint configuration file, it is not recommended because editor extensions such as prettier-atom and prettier-vscode will read .prettierrc, but won't read settings from ESLint, which can lead to an inconsistent experience.

本项目使用的是方案 2。
