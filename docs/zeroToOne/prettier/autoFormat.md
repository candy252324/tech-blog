# 自动格式化

我们可以在 package.json 中添加一条格式化命令，然后运行 `yarn prettier-all`，实现对目标文件自动 prettier。

```json
// package.json
{
  "scripts": {
    "prettier-all": "prettier --write ./src/**/*"
  }
}
```

但是每次手动运行命令也是一件很麻烦的事情。

我们可以给 IDE 安装 `Prettier` 插件，然后将 IDE 默认的格式化工具设置为 `Prettier`。

打开设置，搜索`default formatter`，选择 Prettier，这样，每次文件保存的时候，会自动根据我们的 `.prettierrc` 中的配置进行格式化。
<img :src="$withBase('/imgs/zeroToOne/vscode-prettier-autofomat.jpg')" style="transform:scale(0.9);"/>
