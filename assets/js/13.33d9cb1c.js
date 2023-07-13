(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{410:function(t,s,e){"use strict";e.r(s);var a=e(56),r=Object(a.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"node-支持es-module-的方法"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#node-支持es-module-的方法"}},[t._v("#")]),t._v(" node 支持ES Module 的方法")]),t._v(" "),e("h3",{attrs:{id:"方式一-使用webpack-配个entry-output-然后打包就好了"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#方式一-使用webpack-配个entry-output-然后打包就好了"}},[t._v("#")]),t._v(" 方式一：使用webpack，配个entry,output,然后打包就好了")]),t._v(" "),e("p",[t._v("但是如果引用了一些node内置库，如fs,path,打包后仍然会执行失败，因为webpack的target默认是web, 需要改为node(webpack会提供垫片)")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// webpack.config.js")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("target")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'node'")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("ul",[e("li",[t._v("配置babel-loader(因为低版本的node不会转化async await 语法)\n"),e("code",[t._v("npm i -D babel-loader @babel/core @babel/preset-env")])])]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// webpack.config.js")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("modules")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("rules")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("test")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token regex"}},[e("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),e("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v("\\.js$")]),e("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")])]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("exclude")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token regex"}},[e("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),e("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v("(node_modules|dist)")]),e("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")])]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("use")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("loader")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'babel-loader'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 可以直接在这里配options，也可以配置.babelrc文件")]),t._v("\n          "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// @babel/preset-env 是babel默认的转化集")]),t._v("\n          "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("options")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("presets")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@babel/preset-env'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("plugins")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n              "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n                "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@babel/plugin-transform-runtime'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                  "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("corejs")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// corejs 版本")]),t._v("\n                  "),e("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'regenerator'")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//引入 regeneratorRuntime")]),t._v("\n                  "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("useESModules")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                  "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("helpers")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n                "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n              "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n            "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n          "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("注：即使把exclude去掉后，代码中一个async await 也没有，运行后依然报错了，报错"),e("code",[t._v("regeneratorRuntime is not defined")]),t._v(" ，这里regeneratorRuntime是async await 构建后生成的方法，但是它是以一种垫片的形式加入进去的，由于我们的垫片方法没有加入到我们的代码里，解决方法"),e("code",[t._v("npm i -D @babel/plugin-transform-runtime")]),t._v(",然后配置到plugin属性中。\n仍然报错：用的corejs3版本，得装corejs3库，"),e("code",[t._v("npm i -D @babel/runtime-corejs3")])]),t._v(" "),e("h3",{attrs:{id:"方法二-通过node原生支持"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#方法二-通过node原生支持"}},[t._v("#")]),t._v(" 方法二 通过node原生支持")]),t._v(" "),e("ul",[e("li",[t._v("文件名必须改为.mjs")]),t._v(" "),e("li",[t._v("使用exprot导出，import加载.mjs")]),t._v(" "),e("li",[t._v("node 8开始是实验属性，用的时候需要加参数"),e("code",[t._v("node --experimental-modules index.js")])]),t._v(" "),e("li",[t._v("node 14开始不需要加参数")])]),t._v(" "),e("p",[e("code",[t._v("nvm ls")]),t._v(" 查看本地所有node版本")]),t._v(" "),e("p",[e("code",[t._v("nvm ls-remote")]),t._v(" 查看远程所有node版本")]),t._v(" "),e("p",[e("code",[t._v("nvm install 14.15.2")]),t._v(" 安装指定版本")])])}),[],!1,null,null,null);s.default=r.exports}}]);