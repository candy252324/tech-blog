# 编辑器的类型检查

即使我们没有安装 typescript ，IDE 也能提示错误。

这是因为 IDE 检测到 ts 文件后会默认使用自带的 typescript 中的 tsc 进行检查。主流的 IDE 都是支持 ts 类型检查的。

当然也可以全局或项目安装 typescript ，然后在 IDE 中选择自己安装的 typescript 版本进行类型检查。另外，如果用户未提供 `tsconfig.json`，IDE 会使用默认配置。

### 如何切换编辑器的 typescript 版本？
vscode 编辑器中 `ctr` + `shift `+ `p` 打开输入框，输入"version"，选择`TypeScript:Select TypeScript Version...`，然后就可以切换 typescript 版本了。

<img :src="$withBase('/imgs/zeroToOne/ide-ts-version.jpg')"/>