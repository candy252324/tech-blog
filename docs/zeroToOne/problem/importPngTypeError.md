# import 图片资源 ts类型检查报错


.vue 文件中的 `<script>`标签添加`lang='ts'`后，ts 将会进行类型检查，然后发现import 图片资源的语句报错了，一条来自 Vetur，另一条来自 ts，报错内容一样。

<img :src="$withBase('/imgs/zeroToOne/problem-png-type-error.jpg')">

原因是Typescript内只能识别.ts和.js文件, 不知道如何处理.png文件, 只需让Typescript知道怎么处理.png文件即可。
```ts
// global.d.ts
declare module '*.png' {
  let base64: string
  export default base64
}

```