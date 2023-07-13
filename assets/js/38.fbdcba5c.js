(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{434:function(s,t,e){"use strict";e.r(t);var a=e(56),n=Object(a.a)({},(function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"icon-图标乱码问题"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#icon-图标乱码问题"}},[s._v("#")]),s._v(" icon 图标乱码问题")]),s._v(" "),e("p",[s._v("遇到一个 icon 偶发乱码的问题。")]),s._v(" "),e("img",{staticStyle:{transform:"scale(0.9)"},attrs:{src:s.$withBase("/imgs/mess/iconGarbledCode.jpg")}}),s._v(" "),e("p",[s._v("当时的场景是，基于 elementUi 做组件库二次开发，顺带打几套公司业务适用的主题，实际业务项目中通过类似于 "),e("code",[s._v("import '@xxx/xxx/blueTheme.css'")]),s._v(" 的方式引入对应的主题 css 文件。")]),s._v(" "),e("p",[s._v("实现方式很简单，改变主题scss变量，然后使用 "),e("a",{attrs:{href:"https://www.npmjs.com/package/sass",target:"_blank",rel:"noopener noreferrer"}},[s._v("dart-sass"),e("OutboundLink")],1),s._v(" 将全量的 "),e("code",[s._v(".scss")]),s._v(" 编译成 "),e("code",[s._v(".css")]),s._v(" 。")]),s._v(" "),e("p",[e("strong",[s._v("出现乱码的原因是，使用 dart-sass 将 "),e("code",[s._v(".scss")]),s._v(" 编译成 "),e("code",[s._v(".css")]),s._v(" 时使用了压缩属性，导致 icon 伪元素的 content unicode 编码被转换成了对应 unicode 明文，"),e("code",[s._v('content:"\\e6c3"')]),s._v(" 变成了 "),e("code",[s._v('content:""')]),s._v(" , 导致乱码。")])]),s._v(" "),e("p",[s._v("如以下示例代码：")]),s._v(" "),e("div",{staticClass:"language-scss extra-class"},[e("pre",{pre:!0,attrs:{class:"language-scss"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// test.scss")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".el-icon-chicken:before")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[s._v("content")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"\\e6c3"')]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),e("ol",[e("li",[s._v("使用 "),e("code",[s._v("dart-sass")]),s._v(" 编译，带压缩参数，编译命令及结果如下：")])]),s._v(" "),e("p",[e("code",[s._v("npx sass ./test.scss ./test.css --style compressed --no-source-map")])]),s._v(" "),e("div",{staticClass:"language-css extra-class"},[e("pre",{pre:!0,attrs:{class:"language-css"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/* 压缩输出 test.css */")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".el-icon-chicken:before")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),e("span",{pre:!0,attrs:{class:"token property"}},[s._v("content")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),e("ol",{attrs:{start:"2"}},[e("li",[s._v("还是使用 "),e("code",[s._v("dart-sass")]),s._v(" 编译，但是不压缩，编译命令及结果如下：")])]),s._v(" "),e("p",[e("code",[s._v("npx sass ./test.scss ./test.css --no-source-map")])]),s._v(" "),e("div",{staticClass:"language-css extra-class"},[e("pre",{pre:!0,attrs:{class:"language-css"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/* 不压缩输出 test.css */")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".el-icon-chicken:before")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n "),e("span",{pre:!0,attrs:{class:"token property"}},[s._v("content")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"\\e6c3"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),e("p",[s._v("由上可以看到，"),e("code",[s._v("dart-dass")]),s._v(" 带压缩参数的情况下，将"),e("code",[s._v('"\\e6c3"')]),s._v("编译成了"),e("code",[s._v('""')]),s._v(" , 但是不带压缩参数，就没有问题。")]),s._v(" "),e("p",[s._v("问题是我需要压缩啊，压缩可以减少很多体积。")]),s._v(" "),e("p",[e("strong",[s._v("最后解决方法是，使用 "),e("code",[s._v("node-sass")]),s._v(" 来编译就好了")]),s._v("，elementUi本来就是用 "),e("code",[s._v("node-sass")]),s._v(" 编译的。\n以下使用 "),e("code",[s._v("node-sass")]),s._v(" 编译命令及编译结果:")]),s._v(" "),e("p",[e("code",[s._v("npx node-sass ./test.scss --output-style=compressed ./test.css")])]),s._v(" "),e("div",{staticClass:"language-css extra-class"},[e("pre",{pre:!0,attrs:{class:"language-css"}},[e("code",[e("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".el-icon-chicken:before")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),e("span",{pre:!0,attrs:{class:"token property"}},[s._v("content")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"\\e6c3"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])])])}),[],!1,null,null,null);t.default=n.exports}}]);