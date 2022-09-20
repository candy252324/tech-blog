# loader 的作用

**webpack 只能处理 js，非 js 文件需要对应的 loader 来处理。**

loader 可以链式调用。链中的每个 loader 都将对资源进行转换。链会**逆序执行**，第一个 loader 将其结果（被转换后的资源）传递给下一个 loader，依此类推。
