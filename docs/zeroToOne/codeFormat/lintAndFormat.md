# 代码风格

ESLint ：主要解决代码质量 （如：定义了变量却未使用）

Prettier：代码风格（缩进，函数大括号是否换行，单引号双引号）

```js
// .eslintrc
{
  // 使用 airbnb 作为代码质量检测工具
  "extends": ["airbnb"]  // yarn add  eslint-config-airbnb -D
}
```

使用 Prettier + ESLint 就完完全全解决了两个问题？不，会起冲突
 冲突怎么办：
 
