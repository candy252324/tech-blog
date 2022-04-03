module.exports = {
  title: '先放番茄后放蛋',
  description: '对吗？试试就知道了',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/tech-blog/',
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    nav: [
      { text: 'Cli', link: '/cli/' },
    ],
    sidebar: {
      '/cli/': [
        {
          title: '脚手架原理', children: ['/cli/cli-principle', '/cli/a-simple-cli']
        },
        {
          title: 'npm-link 和 lerna', children: ['npm-link', 'learna', 'lerna-principle']
        },
        {
          title: '前置准备工作', children: [
            '/cli/prepare/customLog',
            '/cli/prepare/checkPkgVersion',
            '/cli/prepare/checkEnv',
            '/cli/prepare/checkNodeVersion',
            '/cli/prepare/checkOpenDebug',
            '/cli/prepare/checkRoot',
            '/cli/prepare/checkUserHomeDir',
          ]
        },
        {
          title: 'start', children: ['start']
        },
      ],
    },
    sidebarDepth: 2,
  }
};