# 遇到的问题

## 1. `__dirname` 无法使用问题

路径解析中有时候会需要使用`__dirname`，它是 commonjs 规范的内置变量，但是由于本项目是使用 ES 模块写的（文件后缀是`.mjs`，最后使用 rollup 打包成 commonjs） 。所以在本项目中无法使用这个变量。最后是这样解决的：

```js
// example.mjs
import { fileURLToPath } from 'url'
const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = path.dirname(__filenameNew)
```

这个 `__dirnameNew`就相当于是 commonjs 中的 `__dirname`，可以直接如下方式使用：

```js
// example.mjs
path.resolve(__dirnameNew, '../xxx/xxx')
```

## 2.待完善的地方

<!-- cjh todo -->

1. 使用 `rely --open` 参数打开浏览器后，如果想同时分析另一个项目，同样使用 `rely --open` 参数打开浏览器，新的浏览器窗口显示的是内容是第一个项目的。期望的结果是：每次打开一个新的浏览器窗口，端口号自动+1，并生成最新的依赖。这块功能有待完善。

<!-- cjh todo -->

2. 看如下代码，`footerComp` 重新命名为 `footerComp2` 后，按照目前的代码逻辑，生成的 `script依赖` 中将不包含 `footerComp2`，因为解析遍历 ast 的时候只处理了 import 声明，没处理 `export default`里的`components`，待后续完善

```html
<tempalte>
  <headerComp/>
  <footerComp2/>
</template>

<script>
import headerComp from './header.vue'
import footerComp from './footer.vue'
export default {
  components: {
    headerComp:headerComp,
    footerComp2: footerComp  //  footerComp 重新命名为 footerComp2 了
  },
}
</script>
```

3. 完善测试用例
