# 概述
很多插件的都实现都是离不开 AST(Abstract syntax tree)，所以先介绍 AST。

AST 是源代码语法结构的一种抽象展示，在 [这里](https://astexplorer.net/)直观感受下什么是 AST。

### 解析器

在 [astexplorer](https://astexplorer.net/)网站上可以切换解析器，稍微了解一下常见的解析器之间的关系：


- `esprima`：
经典的解析器
- `acorn`：在 `esprima` 之后出现，速度比`esprima`快，体积更小，而且支持插件，所以后续的库和 parser 基本都基于它，如 webpack、babel。
- @babel/parser(babylon)基于acorn的
- espree 最初从Esprima中fork出来的，现在基于acorn

[参考文章](https://www.zhihu.com/pin/1316879247613562880)

### 抽象语法树用途

- 代码语法的检查、代码风格的检查、代码的格式化、代码的高亮、代码错误提示、代码自动补全等等
- 优化变更代码，改变代码结构使达到想要的结构





