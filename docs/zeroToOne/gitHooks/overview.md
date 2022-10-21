# 概述

Git 能在特定的重要动作发生时触发自定义脚本。其中比较常用的 hooks 有：`pre-commit`、`commit-msg`、`pre-push` 等。[更多 hooks](https://git-scm.com/docs/githooks)。

有了这些 hooks，我们可以做很多事情：

- `pre-commit` 触发时进行代码格式验证
- `commit-msg` 触发时对 commit 消息和提交用户进行验证
- `pre-push` 触发时进行单元测试、e2e 测试等操作

Git 在执行 `git init` 进行初始化时，会在 `.git/hooks` 目录生成一系列的 hooks 脚本，如下图所示：

<img :src="$withBase('/imgs/zeroToOne/git-hooks.jpg')" style="transform:scale(0.9)"/>

可以看到每个脚本的后缀都是以 `.sample` 结尾的，在这个时候，脚本是不会自动执行的。我们需要把后缀去掉之后才会生效，即将 `pre-commit.sample` 变成 `pre-commit` 才会起作用。

我们这里当然不会自己去编写 hooks 脚本，而是使用现成开源的解决方案 [husky](https://github.com/typicode/husky)。

本节内容主要来自于文章[手写 git hooks 脚本](https://zhuanlan.zhihu.com/p/391221822)
