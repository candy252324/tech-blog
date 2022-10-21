# husky

[husky](https://github.com/typicode/husky)是 git hooks 工具。

- `yarn add husky -D`

本项目 `husky`版本是`8.0.1`

- `husky install`

该命令会在项目目录下新增 `.husky/_` 文件夹，这时候查看`.git/config`，可以看到配置中增加了一条 `core.hooksPath` 指向为`.husky`。这就是 husky 的实现原理：**替换`.git/hooks` 的目录为自定义目录**，且该目录会提交到远程仓库。
<img :src="$withBase('/imgs/zeroToOne/husky-install.jpg')" style="transform:scale(0.9);"/>

- `husky uninstall`

该命令会删除`.git/config`中的 `core.hooksPath` 指向，但是并不会删除`.husky/_` 文件夹。

- `husky set|add <file> [cmd]`

如： `npx husky add .husky/pre-commit "yarn lint"`，将会在 `.husky` 目录下生成 `pre-commit` hooks 文件：
<img :src="$withBase('/imgs/zeroToOne/add-githooks-precommit.jpg')" style="transform:scale(0.9);"/>

这样，当 `pre-commit` 触发时，就会执行`yarn lint`命令，如果 lint 没通过，则无法提交。
