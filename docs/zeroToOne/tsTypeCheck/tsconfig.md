# tsconfig.json

[官方文档](https://www.tslang.cn/docs/handbook/tsconfig-json.html)

接下来逐一解释 tsconfig.json 中的常用参数及含义。

## `compilerOptions.noEmit`

## `compilerOptions.jsx`
如果项目中有使用 jsx，那么这个参数是必须配置的。该参数的目的是告诉 tsc 该如何编译项目中的 jsx 文件。
- `preserve`：生成的代码后缀仍然是`.jsx`，以供后续的转换操作使用
- `react`：生成的代码后缀是`.js`，该模式会生成`React.createElement`，在使用前不需要再进行转换操作了
- `react-native`：相当于`preserve`，它也保留了所有的JSX，但是输出文件的扩展名是`.js`


