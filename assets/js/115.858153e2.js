(window.webpackJsonp=window.webpackJsonp||[]).push([[115],{514:function(t,s,e){"use strict";e.r(s);var a=e(56),r=Object(a.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"配置文件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#配置文件"}},[t._v("#")]),t._v(" 配置文件")]),t._v(" "),e("p",[t._v("ESLint 的"),e("a",{attrs:{href:"https://cn.eslint.org/docs/user-guide/configuring",target:"_blank",rel:"noopener noreferrer"}},[t._v("配置文件优先级"),e("OutboundLink")],1),t._v("是：")]),t._v(" "),e("p",[e("code",[t._v(".eslintrc.js")]),t._v(" >"),e("code",[t._v(".eslintrc.yaml")]),t._v(">"),e("code",[t._v(".eslintrc.yml")]),t._v(" >"),e("code",[t._v(".eslintrc.json")]),t._v(" >"),e("code",[t._v(".eslintrc")]),t._v(" >"),e("code",[t._v("package.json")])]),t._v(" "),e("p",[t._v("以下是常用配置。")]),t._v(" "),e("h2",{attrs:{id:"parseroptions"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#parseroptions"}},[t._v("#")]),t._v(" parserOptions")]),t._v(" "),e("p",[e("strong",[t._v("ParserOptions 选项表示 EsLint 对于不同的 Parser（解析器）配置的语言检查规则。")])]),t._v(" "),e("p",[t._v("ESLint 默认使用"),e("a",{attrs:{href:"https://github.com/eslint/espree",target:"_blank",rel:"noopener noreferrer"}},[t._v("Espree"),e("OutboundLink")],1),t._v("作为 Parser 将代码转化为 AST。")]),t._v(" "),e("ul",[e("li",[e("code",[t._v("ecmaVersion")]),t._v("：设置支持的 ECMAScript 版本。默认为 5 ，支持3、5、6、7、8、9 或 10 来指定你想要使用的 ECMAScript 版本，也可以使用年份，如：2015（同 6）。当然也可以使用 "),e("code",[t._v("latest")]),t._v(" 表示最新的 ECMA 版本。")]),t._v(" "),e("li",[e("code",[t._v("sourceType")]),t._v("：设置支持的模块规范，默认为 "),e("code",[t._v("script")]),t._v("。支持 "),e("code",[t._v("script")]),t._v(" 和 "),e("code",[t._v("module")]),t._v(" (ESM) 两种配置。")]),t._v(" "),e("li",[e("code",[t._v("ecmaFeatures")]),t._v("： 它是一个对象，表示代码中可以使用的额外语言特性。")])]),t._v(" "),e("p",[t._v("如下测试代码，不做任何配置的情况下，ESLint 检测会报错：")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"xxx.xx"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Parsing error: The keyword 'import' is reserved")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" a"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),t._v("     "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Parsing error: The keyword 'const' is reserved")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("jsxComp")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("div"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("jsx组件"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("div"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Parsing error: Unexpected token <")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n")])])]),e("p",[t._v("增加以下配置后正常：")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// .eslintrc.js")]),t._v("\nmodule"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("parserOptions")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("ecmaVersion")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'latest'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 指定 EsLint 支持最新的 ECMA 语法检测")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("sourceType")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'module'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置支持的模块规范为 ES Module")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("ecmaFeatures")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("jsx")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 允许代码中使用 jsx")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("这个时候添加一条 rules，"),e("code",[t._v("no-undef")]),t._v(" ：")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("module"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("rules")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'no-undef'")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'error'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 禁止使用未定义的变量")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("然后在测试代码里加一行，发现又报错了，"),e("code",[t._v("Promise")]),t._v("标红了：")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Promise")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("resolve"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" reject")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("   "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// error  'Promise' is not defined")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),e("p",[t._v("这是为啥呢？")]),t._v(" "),e("p",[t._v("因为"),e("code",[t._v("parserOptions")]),t._v(" 中的 "),e("code",[t._v("ecmaScript")]),t._v(" 为 6 或者更高版本时，仅表示 Lint 在检查时支持一些高版本的"),e("strong",[t._v("语法")]),t._v("，比如 let、const、箭头函数等等，但是并不支持新的 Api（如 "),e("code",[t._v("Promise")]),t._v(","),e("code",[t._v("Set")]),t._v("）。")]),t._v(" "),e("p",[t._v("如何支持新的 Api？可以通过配置 "),e("code",[t._v("env.es6")]),t._v(" 为 true，后面讲。")]),t._v(" "),e("h2",{attrs:{id:"parser"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#parser"}},[t._v("#")]),t._v(" parser")]),t._v(" "),e("p",[t._v("前面说了，ESLint 默认使用"),e("a",{attrs:{href:"https://github.com/eslint/espree",target:"_blank",rel:"noopener noreferrer"}},[t._v("Espree"),e("OutboundLink")],1),t._v("作为其解析器，但是 Espree 只能解析 js，如果我们要解析其它类型的文件，就需要指定其它的解析器。")]),t._v(" "),e("blockquote",[e("p",[t._v("本质上所有的解析器最终都需要将代码转化为 espree 格式（AST 的某一种规范，本质上还是 AST）从而交给 Eslint 来检测。")])]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://github.com/typescript-eslint/typescript-eslint/blob/v3.0.1/docs/getting-started/linting/README.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("@typescript-eslint/parser"),e("OutboundLink")],1),t._v("，这个解析器用于解析 ts。")])]),t._v(" "),e("p",[e("code",[t._v("yarn add @typescript-eslint/parser @typescript-eslint/eslint-plugin -D")])]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("module"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("parser")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@typescript-eslint/parser'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("plugins")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@typescript-eslint'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("extends")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'eslint:recommended'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'plugin:@typescript-eslint/recommended'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("ul",[e("li",[e("a",{attrs:{href:"https://github.com/vuejs/vue-eslint-parser",target:"_blank",rel:"noopener noreferrer"}},[t._v("vue-eslint-parser"),e("OutboundLink")],1),t._v("。\n这个解析器能够解析 .vue 文件的 "),e("code",[t._v("<template>")]),t._v("  。如果在模板中使用复杂的指令和表达式，我们很容易在"),e("code",[t._v("<template>")]),t._v("上出错。使用该解析器配合"),e("a",{attrs:{href:"https://github.com/vuejs/eslint-plugin-vue",target:"_blank",rel:"noopener noreferrer"}},[t._v("eslint-plugin-vue"),e("OutboundLink")],1),t._v("的规则方便捕获错误。")])]),t._v(" "),e("p",[t._v("该解析器的 "),e("code",[t._v("parserOptions")]),t._v("与 ESLint 的默认解析器 espree 支持的属性相同，不同的是它还支持配置"),e("code",[t._v("parserOptions.parser")]),t._v("来指定一个自定义分析器用于解析"),e("code",[t._v("<script>")]),t._v("标记。")]),t._v(" "),e("p",[t._v("我们可以这样用：")]),t._v(" "),e("p",[e("code",[t._v("yarn add vue-eslint-parser eslint-plugin-vue -D")])]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("module"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("parser")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"vue-eslint-parser"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 解析 <template> 标记")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("parserOptions")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("parser")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"@typescript-eslint/parser"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 解析 <script> 标记 ")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("sourceType")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"module"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("vueFeatures")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("filter")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 是否解析vue2的filter，true:按vue2的filter解析  false:按vue3位操作符解析")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("ecmaFeatures")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("jsx")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 允许代码中使用 jsx")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("extends")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"eslint:recommended"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"plugin:vue/vue3-recommended"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// eslint-plugin-vue 提供的 rules 规则合集，可选值很多")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"plugin:@typescript-eslint/recommended"')]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("plugins")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"vue"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 即 eslint-plugin-vue，用的时候省略前缀 eslint-plugin-")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"@typescript-eslint"')]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("h2",{attrs:{id:"env"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#env"}},[t._v("#")]),t._v(" env")]),t._v(" "),e("p",[t._v("指定 env 配置来告诉 ESLint 当前项目支持的运行环境，从而可以使用当前环境下相关的全局变量。")]),t._v(" "),e("p",[t._v("开启了 "),e("code",[t._v("rules : {'no-undef': ['error']}")]),t._v("的情况下，以下代码将报错：")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("console"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("123")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// error  'console' is not defined ")]),t._v("\nconsole"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("window"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("   "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// error  'console' is not defined,  error  'window' is not defined")]),t._v("\nconsole"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("process"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// error  'console' is not defined,  error  'process' is not defined")]),t._v("\n")])])]),e("p",[t._v("添加以下配置后正常：")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// .eslintrc.js")]),t._v("\nmodules"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("env")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("browser")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("node")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("env 配置项支持非常多的选项")]),t._v(" "),e("ul",[e("li",[e("code",[t._v("browser")]),t._v("： 支持浏览器环境，表示支持浏览器环境下的相关全局变量。比如 window、document 等等")]),t._v(" "),e("li",[e("code",[t._v("node")]),t._v("： 支持 NodeJs 环境，可以使用 Node 环境下的全局变量。比如 process、global、require 等等")]),t._v(" "),e("li",[e("code",[t._v("shared-node-browser")]),t._v("： 表示可以使用 Node 环境和浏览器环境下同时存在的全局变量，比如 console 相关。")]),t._v(" "),e("li",[e("code",[t._v("es6")]),t._v("： 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）")]),t._v(" "),e("li",[e("code",[t._v("mocha")]),t._v("：添加所有的 Mocha 测试全局变量")]),t._v(" "),e("li",[t._v("还有很多，"),e("a",{attrs:{href:"https://cn.eslint.org/docs/user-guide/configuring#specifying-environments",target:"_blank",rel:"noopener noreferrer"}},[t._v("看这里"),e("OutboundLink")],1),t._v("：")])]),t._v(" "),e("p",[t._v("这里注意到，之前讲过 "),e("code",[t._v("parserOptions")]),t._v(" 也可以通过配置 "),e("code",[t._v("parserOptions : { ecmaVersion : 6 }")]),t._v(" 来设置支持的 ECMAScript 版本，那么它和 "),e("code",[t._v("env: {es6:true}")]),t._v("有什么区别呢？")]),t._v(" "),e("ul",[e("li",[e("p",[e("code",[t._v("parserOptions : { ecmaVersion : 6 }")]),t._v("：仅支持新的语法，不支持新的 Api。")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("env: {es6:true}")]),t._v("：支持新的语法和 Api，开启 "),e("code",[t._v("env: {es6:true}")]),t._v("，等同于设置了"),e("code",[t._v("parserOptions : { ecmaVersion : 6 }")]),t._v("，无需重复设置。")])])]),t._v(" "),e("h2",{attrs:{id:"globals"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#globals"}},[t._v("#")]),t._v(" globals")]),t._v(" "),e("p",[t._v("之前讲到，我们可以配置 env 来告诉 ESLint 当前项目支持的运行环境，从而可以使用当前环境下相关的全局变量。")]),t._v(" "),e("p",[t._v("那么，如果我们定义了一些特殊的全局变量。那么我们应该如何告诉 EsLint 呢？")]),t._v(" "),e("p",[t._v("添加 "),e("code",[t._v("globals")]),t._v(" 配置：")]),t._v(" "),e("blockquote",[e("p",[t._v("注：如果需要配置禁止对全局变量进行修改，需要启用"),e("a",{attrs:{href:"http://eslint.cn/docs/rules/no-global-assign",target:"_blank",rel:"noopener noreferrer"}},[t._v("no-global-assign"),e("OutboundLink")],1),t._v("规则。")])]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// .eslintrc.js")]),t._v("\nmodule"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("globals")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("aaa")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'readonly'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("bbb")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'writable'")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("rules")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'no-undef'")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'error'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'no-global-assign'")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'error'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 禁止对只读的全局变量进行修改")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),t._v(" "),e("h2",{attrs:{id:"plugins"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#plugins"}},[t._v("#")]),t._v(" plugins")]),t._v(" "),e("p",[t._v("EsLint 默认提供了一系列内置的 Rules 规则给我们进行配置，可以在"),e("code",[t._v("/node_modules/eslint/lib/rules")]),t._v("目录下看到所有这些内置的 Rules：")]),t._v(" "),e("img",{attrs:{src:t.$withBase("/imgs/zeroToOne/eslint-rules-builtIn.jpg")}}),t._v(" "),e("p",[t._v("但是有时候这些内置的规则并不能满足我们的需求，这种情况下就需要使用 "),e("code",[t._v("plugins")]),t._v(" 对规则做一些拓展。")]),t._v(" "),e("p",[e("strong",[t._v("插件用来扩展解析器的功能，插件是"),e("code",[t._v("eslint-plugin-")]),t._v("前缀的包，配置时无需加前缀。")])]),t._v(" "),e("p",[t._v("假如我现在自己写了一个 eslint 插件 "),e("code",[t._v("eslint-plugin-cxx")]),t._v("，里面有 n 条规则，其中一条叫"),e("code",[t._v("no-abcdefg")]),t._v("：")]),t._v(" "),e("p",[e("code",[t._v("yarn add eslint-plugin-cxx -D")])]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// .eslintrc.js")]),t._v("\nmodule"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("plugins")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'cxx'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("rules")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"cxx/no-abcdefg"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"error"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("blockquote",[e("p",[t._v("注意：声明了 Plugin 仅表示我们引入了该规则对应的集合，并不代表会立即启动。需要手动在 rules 中声明对应插件的规则。")])]),t._v(" "),e("h2",{attrs:{id:"extends"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#extends"}},[t._v("#")]),t._v(" extends")]),t._v(" "),e("p",[t._v("规则继承。如果我们每条 rules 都单个去配置（plugins + rules ），无疑是一件非常麻烦的事情。使用"),e("code",[t._v("extends")]),t._v("可以解决单个配置的烦恼。")]),t._v(" "),e("p",[t._v("比如 EsLint 官方提供了 "),e("code",[t._v("eslint:recommended")]),t._v("，当我们在配置文件中继承 "),e("code",[t._v("eslint:recommended")]),t._v(" 时，相当于启用了一系列核心规则，这些规则被 EsLint 官方维护：")]),t._v(" "),e("img",{staticStyle:{transform:"scale(0.9)"},attrs:{src:t.$withBase("/imgs/zeroToOne/eslint-recommended.jpg")}}),t._v(" "),e("p",[e("strong",[t._v("所以，所谓的规则继承，其实就是继承另一份 EsLint 的 rules 配置。")])]),t._v(" "),e("p",[t._v("写法：")]),t._v(" "),e("ul",[e("li",[t._v("ESLint 官方的扩展，比如 "),e("code",[t._v("extends: ['eslint:recommended']")])]),t._v(" "),e("li",[t._v("从 ESLint 的插件进行继承，比如 "),e("code",[t._v("extends: ['plugin:vue/essential']")]),t._v(" 是"),e("code",[t._v("eslint-plugin-vue")]),t._v("插件的扩展")]),t._v(" "),e("li",[t._v("从第三方的 NPM 包规则进行继承，比如 "),e("code",[t._v("extends : ['eslint-config-airbnb']")]),t._v("，配置时可以省略前缀 "),e("code",[t._v("eslint-config-")])]),t._v(" "),e("li",[t._v("从绝对路径继承而来，比如 "),e("code",[t._v('extends: ["./node_modules/coding-standard/eslintDefaults.js"]')])])]),t._v(" "),e("p",[t._v("优先级：\n如果 extends 配置的是一个数组，最终会将所有规则项进行合并，出现冲突的时候，后面的会覆盖前面的\n通过 rules 单独配置的规则优先级比 extends 高。")]),t._v(" "),e("h2",{attrs:{id:"overrides"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#overrides"}},[t._v("#")]),t._v(" overrides")]),t._v(" "),e("p",[t._v("使用"),e("code",[t._v("overrides")]),t._v("可以实现对不同的文件进行不同的 Lint 配置。")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// .eslintrc.js")]),t._v("\nmodule"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("plugins")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'cxx'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("rules")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"no-abcdefg"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"error"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("overrides")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("files")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'src/common/api/**'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("rules")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'cxx/no-abcdefg'")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'off'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// src/common/api 目录下文件关闭 no-abcdefg 规则")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("h2",{attrs:{id:"rules"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#rules"}},[t._v("#")]),t._v(" rules")]),t._v(" "),e("ul",[e("li",[t._v('"off" 或 0 表示关闭本条规则检测')]),t._v(" "),e("li",[t._v('"warn" 或 1 表示开启规则检测，使用警告级别的错误：warn (不会导致程序退出)')]),t._v(" "),e("li",[t._v('"error" 或 2 表示开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)')])]),t._v(" "),e("p",[t._v("如果某项规则，有额外的选项，可以通过数组进行传递，数组的第一位必须是错误级别。\n如 "),e("code",[t._v("rules:{'semi': ['error', 'never']")]),t._v("}, "),e("code",[t._v("never")]),t._v(" 就是额外的配置项")])])}),[],!1,null,null,null);s.default=r.exports}}]);