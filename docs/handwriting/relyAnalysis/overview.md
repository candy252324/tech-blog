# 概述

[项目地址](https://www.npmjs.com/package/component-dependence-analyzer)

对于业务复杂的项目，如果改动了一个基础业务组件 `A`，测试同学想知道具体有哪些地方使用了组件`A`，前端同学就得按照组件路径逐步往上寻找。比如 `B` 和 `C` 引用了 `A`，而 `B` 和 `C` 并不是一级页面，它们还被其它组件引用。比如，一番查找下来发现最终引用关系是这样的：

`财务列表`=>`C`=>`B`=>`A`

`录入工单`=>`D`=>`C`=>`A`

于是告诉测试同学，本次修改影响到的页面有`财务列表`和`录入工单`。

实际情况可能比这个更复杂。

于是我们期望有一个工具，只要我们输入命令`rely -f E:/xxx/xxx/A.vue`，工具便可以自动帮我们完成依赖分析。
