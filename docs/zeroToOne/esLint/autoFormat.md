# 自动格式化

我们可以在 package.json 中添加一条格式化命令，然后运行 `yarn lint`，eslint 会自动帮我们把它能 fix 的代码进行 fix 。

> 注：自动 fix 的主要是代码风格类的问题，如 html 标签里的内容是否另起一行，插值表达式前后是否增加空格等。并不会自动 fix 可能引发 bug 的问题，如：重新赋值 const 常量。

```json
// package.json
{
  "scripts": {
    "lint": "eslint -c ./.eslintrc.js --fix --ext .jsx,.js,.vue,.ts,.tsx ./src"
  }
}
```

但是每次手动运行命令也是一件很麻烦的事情。

我们可以结合 vscode 的 `settings.json` 配置实现保存时自动格式化当前编辑的文件（需要安装 eslint 插件）。

```json
{
  "editor.formatOnType": false,
  "editor.formatOnSave": true,
  // 保存行为
  "editor.codeActionsOnSave": {
    // 保存自动 eslint
    "source.fixAll.eslint": true
  }
}
```
