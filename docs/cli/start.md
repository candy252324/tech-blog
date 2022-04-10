
问题： 
1.所有的包都集中在cli中，当命令较多的时候，会减慢cli的安装速度 
2.每个bu 的init命令可能都不同，需要加载不同模块，需要动态加载







小知识点：require 只支持加载三种文件
1、 .json 通过JSON.parse()解析
2、.js 文件必须导出module.exports 或 exports
3、.node (C++ 插件，原理通过process.dlopen打开一个c++插件)
4、其它任何类型的文件将被当做js文件解析（如在.txt中写js）



