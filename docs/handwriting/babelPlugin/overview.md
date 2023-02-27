# 概述

babel 的工作流程是：

- **解析**：使用 [`@babel/parser`](https://babeljs.io/docs/en/babel-parser) 解析器进行语法解析，获得 AST
- **转换**：然后使用 [`@babel/traverse`](https://babeljs.io/docs/en/babel-traverse) 对 AST 进行遍历和更新

  > babel 插件就是在转换这一步被调用的，本质就是返回一个符合 babel 插件规范的对象，其中最核心的是对象中的 visitor 属性。

- **生成**：最后使用 [`@babel/generator`](https://babeljs.io/docs/en/babel-generator) 将处理后的 AST 转换回正常代码。

> 参考文章 [babel 插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md#toc-asts)
