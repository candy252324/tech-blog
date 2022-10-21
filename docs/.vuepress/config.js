module.exports = {
  title: "先放番茄后放蛋",
  description: "对吗？试试就知道了",
  head: [
    // 注入到当前页面的 HTML <head> 中的标签
    ["link", { rel: "icon", href: "/logo.jpg" }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: "/tech-blog/",
  markdown: {
    lineNumbers: false, // 代码块显示行号
  },
  themeConfig: {
    nav: [
      { text: "Cli", link: "/cli/" },
      { text: "Vue", link: "/vue/" },
      // { text: 'webpack', link: '/webpack/' },
      { text: "Promise", link: "/promise/" },
      { text: "0 -> 1", link: "/zeroToOne/" },
      { text: "其它", link: "/mess/" },
    ],
    sidebar: {
      "/cli/": [
        {
          title: "脚手架原理",
          children: ["/cli/cli-principle", "/cli/a-simple-cli"],
        },
        {
          title: "npm-link 和 lerna",
          children: ["npm-link", "learna", "lerna-principle"],
        },
        {
          title: "前置检查",
          children: [
            "/cli/prepare/customLog",
            "/cli/prepare/checkPkgVersion",
            "/cli/prepare/checkEnv",
            "/cli/prepare/checkNodeVersion",
            "/cli/prepare/checkOpenDebug",
            "/cli/prepare/checkRoot",
            "/cli/prepare/checkUserHomeDir",
          ],
        },
        {
          title: "commander",
          children: [
            "/cli/commander/basicUsage",
            "/cli/commander/customizedUsage",
          ],
        },
      ],
      "/vue/": [
        {
          title: "手写vue1",
          children: [
            "/vue/vue1/overview",
            "/vue/vue1/defineReactive",
            "/vue/vue1/protoArray",
            "/vue/vue1/proxy",
            "/vue/vue1/observer",
            "/vue/vue1/compiler",
            "/vue/vue1/watcher",
            "/vue/vue1/dep",
            "/vue/vue1/problem",
          ],
        },
        {
          title: "手写vue2",
          children: [
            "/vue/vue2/overview",
            "/vue/vue2/renderHelper",
            "/vue/vue2/renderFn",
            "/vue/vue2/mountComponent",
            "/vue/vue2/patch",
            "/vue/vue2/slot",
            "/vue/vue2/diff",
            "/vue/vue2/computed",
            "/vue/vue2/asyncUpdateQueue",
          ],
        },
        {
          title: "手写vue3",
          children: ["/vue/vue3/overview"],
        },
        {
          title: "vue常见问题",
          children: [
            "/vue/problems/idxAsKey",
            "/vue/problems/computedCauseSlowly",
            "/vue/problems/keepAliveDontWork",
            "/vue/problems/vModel",
            "/vue/problems/watcherAndDep",
          ],
        },
      ],
      // "/webpack/": [
      //   {
      //     title: '手写webpack', children: [
      //       '/webpack/myWebpack/overview',
      //     ],
      //   },
      // ],

      "/promise/": [
        {
          title: "手写Promise",
          children: [
            "/promise/myPromise/basic",
            "/promise/myPromise/status",
            "/promise/myPromise/value",
            "/promise/myPromise/asyncFn",
            "/promise/myPromise/callTime",
            "/promise/myPromise/multipleCall",
            "/promise/myPromise/callChaining",
            "/promise/myPromise/test",
          ],
        },
        {
          title: "Promise常见问题",
          children: [
            "/promise/realPromise/cancelable",
            "/promise/realPromise/axiosCancel",
            "/promise/realPromise/throwError",
          ],
        },
      ],
      "/zeroToOne/": [
        {
          title: "基础配置",
          children: [
            "/zeroToOne/base/init",
            "/zeroToOne/base/env",
            "/zeroToOne/base/outputPath",
            "/zeroToOne/base/browserslist",
            "/zeroToOne/base/resolve.alias",
            "/zeroToOne/base/resolve.extensions",
            "/zeroToOne/base/publicPath",
          ],
        },
        {
          title: "loader",
          children: [
            "/zeroToOne/loader/loaderIndex",
            "/zeroToOne/loader/css",
            "/zeroToOne/loader/less",
            "/zeroToOne/loader/image",
            "/zeroToOne/loader/vue",
            "/zeroToOne/loader/jsx",
            "/zeroToOne/loader/ts",
          ],
        },
        {
          title: "babel",
          children: [
            "/zeroToOne/babel/overView",
            "/zeroToOne/babel/babelConfigFile",
            "/zeroToOne/babel/coreJs",
            "/zeroToOne/babel/presetEnv",
            "/zeroToOne/babel/babelPolyfill",
            "/zeroToOne/babel/babelRuntime",
            "/zeroToOne/babel/pluginTransformRuntime",
            "/zeroToOne/babel/summary",
          ],
        },
        // cjh todo
        // {
        //   title: "其它webpack配置", children: [
        //     '/zeroToOne/webpack/htmlWebpackPlugin',
        //   ]
        // },
        {
          title: "ts的类型检查",
          children: [
            "/zeroToOne/tsTypeCheck/overview",
            "/zeroToOne/tsTypeCheck/tsconfig",
            "/zeroToOne/tsTypeCheck/ideTypeCheck",
          ],
        },
        {
          title: "ESlint",
          children: [
            "/zeroToOne/esLint/overview",
            "/zeroToOne/esLint/eslintrc.js",
            "/zeroToOne/esLint/ignore",
            "/zeroToOne/esLint/autoFormat",
          ],
        },
        {
          title: "Prettier",
          children: [
            "/zeroToOne/prettier/overview",
            "/zeroToOne/prettier/prettierrc.js",
            "/zeroToOne/prettier/conflictWithEslint",
            "/zeroToOne/prettier/autoFormat",
          ],
        },
        {
          title: "gitHooks",
          children: ["/zeroToOne/gitHooks/husky"],
        },
        {
          title: "遇到的问题",
          children: [
            "/zeroToOne/problem/langtsCompilerError",
            "/zeroToOne/problem/importPngTypeError",
          ],
        },
      ],
      "/mess/": [
        // '/mess/priorityLevel',
        "/mess/jsonStringify",
        "/mess/requireAndImport",
        "/mess/svg",
        "/mess/changeTheme",
        "/mess/lessAndSass",
        // '/mess/setTimeoutParam3'
      ],
    },
    sidebarDepth: 2,
  },
};
