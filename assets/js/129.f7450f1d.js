(window.webpackJsonp=window.webpackJsonp||[]).push([[129],{530:function(t,s,e){"use strict";e.r(s);var n=e(56),a=Object(n.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"与-eslint-规则产生了冲突"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#与-eslint-规则产生了冲突"}},[t._v("#")]),t._v(" 与 ESlint 规则产生了冲突")]),t._v(" "),e("p",[t._v("比如我这里配置了 "),e("code",[t._v("prettier")]),t._v(" 的 "),e("code",[t._v("htmlWhitespaceSensitivity")]),t._v(" 规则为 "),e("code",[t._v("ignore")]),t._v("，含义是忽略 "),e("code",[t._v("html")]),t._v(" 标签内的左右空格。")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// .prettierrc.js")]),t._v("\nmodule"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("htmlWhitespaceSensitivity")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"ignore"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("p",[t._v("如：")]),t._v(" "),e("div",{staticClass:"language-html extra-class"},[e("pre",{pre:!0,attrs:{class:"language-html"}},[e("code",[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("hello"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),e("p",[t._v("它将被 prettier 成")]),t._v(" "),e("div",{staticClass:"language-html extra-class"},[e("pre",{pre:!0,attrs:{class:"language-html"}},[e("code",[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("hello"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),e("p",[t._v("而 ESlint 插件"),e("a",{attrs:{href:"https://github.com/vuejs/eslint-plugin-vue",target:"_blank",rel:"noopener noreferrer"}},[e("code",[t._v("eslint-plugin-vue")]),e("OutboundLink")],1),t._v("中有一条规则"),e("a",{attrs:{href:"https://eslint.vuejs.org/rules/singleline-html-element-content-newline.html",target:"_blank",rel:"noopener noreferrer"}},[e("code",[t._v("vue/singleline-html-element-content-newline")]),e("OutboundLink")],1),t._v("，该规则的含义是 html 中单行元素的内容前后强制换行，即它输出的结果将是这样的：")]),t._v(" "),e("div",{staticClass:"language-html extra-class"},[e("pre",{pre:!0,attrs:{class:"language-html"}},[e("code",[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("hello"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),e("p",[t._v("这样就产生了冲突。如何解决呢？")]),t._v(" "),e("p",[e("strong",[t._v("方案 1：")]),t._v("\n在遇到冲突的时候关闭对应的 ESlint 规则或者修改对应的 prettier 规则：")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// .eslintrc.js")]),t._v("\nmodule"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("extends")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"plugin:vue/vue3-recommended"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// eslint-plugin-vue 提供的 rules 规则合集")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("rules")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"vue/singleline-html-element-content-newline"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 与 prettier htmlWhitespaceSensitivity 规则冲突")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("p",[e("strong",[t._v("方案 2：")]),t._v("\n使用 "),e("a",{attrs:{href:"https://github.com/prettier/eslint-config-prettier#readme",target:"_blank",rel:"noopener noreferrer"}},[e("code",[t._v("eslint-config-prettier")]),e("OutboundLink")],1),t._v("，关闭 ESlint 中所有不必要或可能与 prettier 冲突的规则。")]),t._v(" "),e("p",[e("code",[t._v("yarn add eslint-config-prettier -D")])]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// .eslintrc.js")]),t._v("\nmodule"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("extends")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"some-other-config-you-use"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 其它扩展")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"prettier"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 即 eslint-config-prettier，用于关闭 ESlint 中所有不必要或可能与 prettier 冲突的规则。确保把它放在最后，这样它就有机会覆盖其他配置")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("p",[t._v("这样一来，ESlint 不会再对代码风格类的问题进行检查，所有的代码风格规则都写在 "),e("code",[t._v(".prettierrc")]),t._v(" 中吧！")]),t._v(" "),e("p",[e("strong",[t._v("方案 3：")]),t._v("\n使用"),e("a",{attrs:{href:"https://github.com/prettier/eslint-plugin-prettier#readme",target:"_blank",rel:"noopener noreferrer"}},[t._v("eslint-plugin-prettier"),e("OutboundLink")],1),t._v("，这个插件可以让你在 eslint 中写 prettier 规则，官方建议将这个插件和方案 2 中的 "),e("code",[t._v("eslint-config-prettier")]),t._v(" 配合起来用。")]),t._v(" "),e("p",[t._v("但是这样有一个缺陷，由于 IDE 中的插件只会读取 "),e("code",[t._v(".prettierrc")]),t._v("，而不会读取 ESlint 中的 prettier 配置，这将会导致不一致的体验。")]),t._v(" "),e("blockquote",[e("p",[t._v("Note: While it is possible to pass options to Prettier via your ESLint configuration file, it is not recommended because editor extensions such as prettier-atom and prettier-vscode will read .prettierrc, but won't read settings from ESLint, which can lead to an inconsistent experience.")])]),t._v(" "),e("p",[t._v("本项目使用的是方案 2。")])])}),[],!1,null,null,null);s.default=a.exports}}]);