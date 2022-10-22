# 代码提交前自动格式化

我们希望提交到远端的代码都是 `lint` 通过并且 `prettier` 过的。

安装 [lint-staged](https://www.npmjs.com/package/lint-staged),它只将暂存区的 git 文件交给 lint 进行检查。

`yarn add lint-staged -D`

`/.husky/pre-commit` 脚本里命令设置为`yarn lint-stated`

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

yarn lint-staged
```

package.json 中添加需要格式化的文件和命令

```json
// package.json
"lint-staged": {
  "*.{ts,js,tsx,jsx,vue}": [
    "eslint --fix"
  ],
  "*.{ts,js,tsx,jsx,vue,less,css}":[
    "prettier --write"
  ]
}
```

以上配置，当提交代码时，`pre-commit`触发，执行`lint-stated`，`lint-stated` 将暂存区匹配后缀的文件进行 `eslint --fix` 和 `prettier --write`。
