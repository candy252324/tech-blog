(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{415:function(s,t,a){"use strict";a.r(t);var n=a(56),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"npm-link"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#npm-link"}},[s._v("#")]),s._v(" npm-link")]),s._v(" "),a("p",[s._v("本地开发 npm 包的时候，使用"),a("code",[s._v("npm link")]),s._v("可以方便的进行模块调试，避免频繁发包。")]),s._v(" "),a("h3",{attrs:{id:"场景一-使用相对路径进行-link"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#场景一-使用相对路径进行-link"}},[s._v("#")]),s._v(" 场景一： 使用相对路径进行 link")]),s._v(" "),a("p",[s._v("如下目录结果，project 是项目目录，cxx-utils 是需要开发的 npm 包。")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("├─project\n  ├─index.js\n  ├─package.json\n├─cxx-utils\n  ├─index.js\n  ├─package.json\n")])])]),a("p",[s._v("cxx-utils/index.js 中定义了一个 sum 方法：")]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// cxx-utils/index.js")]),s._v("\nexports"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[s._v("sum")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" b")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),a("p",[s._v("project/index.js 中引用了 cxx-utils 中的方法:")]),s._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// project/package.json")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"dependencies"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"cxx-utils"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^0.0.1"')]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// project/index.js")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" utils "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"cxx-utils"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" sum "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" utils"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sum")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("sum"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),a("p",[s._v("这种情况，如何 link 呢？")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 进入项目目录")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" project\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 使用相对路径link")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("link")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("/cxx-utils\n")])])]),a("p",[s._v("link 成功后，可以看到，project/node_modules 目录下多了一个 cxx-utils 的软链接。")]),s._v(" "),a("img",{staticStyle:{transform:"scale(0.9)"},attrs:{src:s.$withBase("/imgs/cli/npm-link-local.png")}}),s._v(" "),a("h3",{attrs:{id:"场景二-全局-link"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#场景二-全局-link"}},[s._v("#")]),s._v(" 场景二： 全局 link")]),s._v(" "),a("p",[s._v("如果 project 和 cxx-utils 不在一个目录下怎么办呢？")]),s._v(" "),a("p",[s._v("我们需要先将 util 包 link 到全局：")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 进入util包目录")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" cxx-utils\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 将util包link到全局")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("link")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 进入项目目录")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" project\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# link 全局的utils 包")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("link")]),s._v(" cxx-utils\n")])])]),a("p",[s._v("第二步（将 util 包 link 到全局）执行完后，可以看到在系统根目录先生成了 cxx-utils 包的软连接。\n"),a("img",{staticStyle:{transform:"scale(0.9)"},attrs:{src:s.$withBase("/imgs/cli/npm-link-global.png")}})]),s._v(" "),a("blockquote",[a("p",[s._v("tips:如果已经执行了 link，并且"),a("code",[s._v("where xxx")]),s._v("也能看到路径，但是运行 "),a("code",[s._v("xxx")]),s._v(" 报错 “系统找不到指定的路径”，重启电脑试试")])]),s._v(" "),a("h3",{attrs:{id:"解除-link"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#解除-link"}},[s._v("#")]),s._v(" 解除 link")]),s._v(" "),a("p",[s._v("解除项目和模块 link，项目目录下，npm unlink 模块名")]),s._v(" "),a("p",[s._v("解除模块全局 link，模块目录下，npm unlink 模块名")]),s._v(" "),a("p",[a("strong",[s._v("注：npm link 会在 node_nodules 下添加软链接，但不会在 package.json 中自动添加依赖。但是 ，unlink 会自动移除 package.json 中的依赖。")])]),s._v(" "),a("h3",{attrs:{id:"最后-补充一个小点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#最后-补充一个小点"}},[s._v("#")]),s._v(" 最后，补充一个小点")]),s._v(" "),a("p",[s._v("如果在 cxx-utils 目录下执行"),a("code",[s._v("npm i cxx-utils -g")]),s._v(", 并不会在用户根目录下安装远程 npm 上的 cxx-utils 包，而只是在用户根目录下创建了一个本地 cxx-utils 的软连接。效果等同于在 cxx-utils 目录下执行"),a("code",[s._v("npm link")]),s._v("。")])])}),[],!1,null,null,null);t.default=e.exports}}]);