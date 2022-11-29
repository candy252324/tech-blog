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
{
  "lint-staged": {
    "*.{ts,js,tsx,jsx,vue}": [
      "eslint --fix",
      "git add" // 格式化成功则自动执行 git add
    ],
    "*.{ts,js,tsx,jsx,vue,less,css}": ["prettier --write"]
  }
}
```

以上配置，当提交代码时，`pre-commit`触发，执行`lint-stated`，`lint-stated` 将暂存区匹配后缀的文件进行 `eslint --fix` 和 `prettier --write`。

### 本项目使用的 husky 和 lint-staged 版本

#### husky 版本 2.3.0

由于个人不想在项目目录下添加这个 `.husky/_` 文件夹，只想在 `package.json` 里简单配置一下，所以本项目决定使用一个低版本的 `husky` —— 2.3.0。(肯定还有其它版本或方式可以用，这里不想思考了，就用 2.3.0 版本了）

`husky uninstall` // 如果之前不小心装了更高版本的 `husky`， 先移除

`yarn add husky@2.3.0 -D`

#### lint-staged 版本 8.1.7

刚开始装的是 13.x 的 `lint-staged`，出现的问题是，即使只改了一行代码，控制台也会输出大量信息，看着像是对所有文件进行了 lint，而非仅修改文件。后面改成了 `8.1.7` 版本后，输出信息就正常了。

<img :src="$withBase('/imgs/zeroToOne/lint-staged-output-message.png')">

最终的 package.json 配置如下：

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,js,tsx,jsx,vue}": ["eslint --fix", "git add"],
    "*.{ts,js,tsx,jsx,vue,less,css}": ["prettier --write"]
  }
}
```
