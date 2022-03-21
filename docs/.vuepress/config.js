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
          title: '一个简单的脚手架', children: ['/cli/cli-principle', '/cli/a-simple-cli']
        },
      ],
    },
    sidebarDepth: 2,
  }
};