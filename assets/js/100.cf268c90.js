(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{499:function(e,r,v){"use strict";v.r(r);var _=v(56),o=Object(_.a)({},(function(){var e=this,r=e.$createElement,v=e._self._c||r;return v("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[v("h1",{attrs:{id:"babel-runtime"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#babel-runtime"}},[e._v("#")]),e._v(" "),v("code",[e._v("@babel/runtime")])]),e._v(" "),v("p",[e._v("在使用 "),v("code",[e._v("@babel/preset-env")]),e._v(" 提供的语法转换和 api 添加的功能时，难免会造成文件的体积增加以及api的全局污染。为了解决这类问题，引入了 runtime 的概念，runtime 的核心思想是以引入替换的方式来解决兼容性问题。")]),e._v(" "),v("p",[e._v("runtime包有三个：")]),e._v(" "),v("ul",[v("li",[v("p",[v("a",{attrs:{href:"https://www.babeljs.cn/docs/babel-runtime",target:"_blank",rel:"noopener noreferrer"}},[v("code",[e._v("@babel/runtime")]),v("OutboundLink")],1)])]),e._v(" "),v("li",[v("p",[v("a",{attrs:{href:"https://babeljs.io/docs/en/babel-runtime-corejs2",target:"_blank",rel:"noopener noreferrer"}},[v("code",[e._v("@babel/runtime-corejs2")]),v("OutboundLink")],1)])]),e._v(" "),v("li",[v("p",[v("code",[e._v("@babel/runtime-corejs3")])])])]),e._v(" "),v("p",[e._v("三个包都依赖"),v("code",[e._v("helpers")]),e._v("、"),v("code",[e._v("regenerator-runtime")]),e._v("模块来实现语法的替换，"),v("code",[e._v("helpers")]),e._v("中提供了一些语法模拟的函数，"),v("code",[e._v("regenerator-runtime")]),e._v("中实现了"),v("code",[e._v("async/await")]),e._v("语法的转换。")]),e._v(" "),v("p",[v("strong",[e._v("注：只有在 "),v("code",[e._v("@babel/preset-env")]),e._v(" 的帮助下，runtime 包的语法模拟替换功能才会发挥作用。")])]),e._v(" "),v("p",[e._v("三个包不同的区别是：")]),e._v(" "),v("ul",[v("li",[v("p",[v("code",[e._v("@babel/runtime")]),e._v(" 只能处理语法替换，跟随 "),v("code",[e._v("@babel/preset-env")]),e._v(" 安装。")])]),e._v(" "),v("li",[v("p",[v("code",[e._v("@babel/runtime-corejs2")]),e._v(" 相比较 "),v("code",[e._v("@babel/runtime")]),e._v(" 增加了 "),v("code",[e._v("core-js@2")]),e._v(" 来支持全局构造函数（如"),v("code",[e._v("Promise")]),e._v("）和静态方法（如"),v("code",[e._v("Array.from")]),e._v("）兼容。需要单独安装。")])]),e._v(" "),v("li",[v("p",[v("code",[e._v("@babel/runtime-corejs3")]),e._v(" 相比较 "),v("code",[e._v("@babel/runtime-corejs2")]),e._v(" 支持了实例方法(如"),v("code",[e._v("[].flat()")]),e._v(")的兼容，同时还支持对ECMAScript 提案的 api 进行模拟。需要单独安装。")])])]),e._v(" "),v("p",[e._v("我们安装 "),v("code",[e._v("@babel/runtime-corejs2")]),e._v(" 和 "),v("code",[e._v("@babel/runtime-corejs3")]),e._v("具体看一下区别：")]),e._v(" "),v("p",[v("code",[e._v("@babel/runtime-corejs2")]),e._v("依赖"),v("code",[e._v("core-js")]),e._v("，并从"),v("code",[e._v("core-js")]),e._v("中的 library 模块去加载对应的 runtime 代码。")]),e._v(" "),v("img",{attrs:{src:e.$withBase("/imgs/zeroToOne/runtime-corejs2.jpg")}}),e._v(" "),v("p",[e._v("而 "),v("code",[e._v("@babel/runtime-corejs3")]),e._v("依赖"),v("code",[e._v("core-js-pure")]),e._v("，并从"),v("code",[e._v("core-js-pure")]),e._v(" 去加载对应的 runtime 代码：")]),e._v(" "),v("img",{attrs:{src:e.$withBase("/imgs/zeroToOne/runtime-corejs3.jpg")}}),e._v(" "),v("blockquote",[v("p",[e._v("之前讲过，"),v("code",[e._v("core-js/library")]),e._v(" 和 "),v("code",[e._v("core-js-pure")]),e._v(" 都是不污染全局的 runtime 模块。")])]),e._v(" "),v("p",[e._v("此外，可以看到，"),v("code",[e._v("@babel/runtime-corejs3")]),e._v(" 比 "),v("code",[e._v("@babel/runtime-corejs2")]),e._v(" 多了一个 "),v("code",[e._v("/instance")]),e._v("目录，里面有约 40 多个实例方法的定义。")]),e._v(" "),v("img",{attrs:{src:e.$withBase("/imgs/zeroToOne/runtime-corejs3-instance.jpg")}}),e._v(" "),v("p",[e._v("但是当我们使用这些 Api 或 实例方法的时候，总不能自己一个一个手动导入，这时候就需要"),v("code",[e._v("@babel/plugin-transform-runtime")]),e._v("了。")])])}),[],!1,null,null,null);r.default=o.exports}}]);