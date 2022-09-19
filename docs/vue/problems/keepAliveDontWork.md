# 路由嵌套导致的keepAlive失效问题

## 1.现象描述

如下图所示，导航栏有两层，路由两级嵌套（routerView 里还有 routerView），路由切换，组件 1 和 组件 2 页面输入的东西还在，但是组件 3 和 组件 4 页面输入的东西有时候会清空有时候不会清空，具体来说是，如果只在二级导航之间切换路由，内容不会清空，一旦切到一级导航，二级导航页面的内容就会被清空。

<img :src="$withBase('/imgs/myvue/keepalive-dont-work.png')" style="transform:scale(0.8)">

路由配置如下：
```js
  export default [{
    path: '/system',
    component: Layout,   // 一级 routerView 容器
    name: 'system',
    children: [
      { path: 'role', name: 'role', component: Comp1, },
      { path: 'account', name: 'account', component: Comp2 },
      {
        path: '/system/setting',
        component: SettingIndex,  // 二级 routerView 容器
        name: 'setting',
        children: [
          { path: "org", name: "org", component: Comp3 },
          { path: "school", name: "school", component: Comp4 },
        ]
      },
    ]
  }]
```

一级 routerView 容器组件`Layout`代码如下：
```vue
<!-- Layout.vue --> 
<template>
  <div class="layout">
    <keep-alive :include="cachedViews">
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
export default {
  data(){
     // "role" 是组件 1 的 name, "account" 是组件 2 的 name
    return { cachedViews:["role","account"] } 
  }
};
</script>
```

二级 routerView 容器组件`SettingIndex`代码如下：
```vue
<!-- SettingIndex.vue --> 
<template>
  <keep-alive :include="cachedViews">
    <router-view/>
  </keep-alive>
</template>

<script>
export default {
  name: "settingIndex",
  data(){
    // "org" 是组件 3 的 name, "school" 是组件 4 的 name
    return { cachedViews:["org","school"] }
  }
};
</script>
```



## 2.keepAlive 原理

- 1. `<keep-alive/>` 组件内部会维护一个 `cache` 对象数组和一个`keys`数组，分别用于存放需要缓存的组件的 vnode 和 key（用户没传key的话，内部会自己算一个 key ）。

- 2. `<keep-alive/>` 里面有一个 `render` 函数，执行 `<keep-alive/>` 组件渲染的时候，就会执行到这个 `render` 函数，在 render 函数中，首先获取到 `<keep-alive/>` 组件的默认插槽，然后获取到第一个子节点的 vnode 

>“第一个子节点”的含义是，所以一般和 `component` 动态组件或者是 `router-view`搭配使用。

- 3. 拿到第一个字节点 vnode 后，通过 `include`和`exclude`判断该组件是否需要缓存：如果不需要缓存，则直接返回该 vnode ；如果需要缓存，再判断该 vnode 在`cache`中是否存在，已经存在则直接从`cache`中取，并使用 LRU 算法调整 `keys` 数组的顺序，不存在则将该 `vnode` 存到 `cache` 中。


在问题场景中，由于外层`<keep-alive/>`的`include`属性中包含组件 1 和组件 2 的 `name`，即 `["role","account"]`，当一级routerView 视图变化时候，直接通过组件 `key` 从`cache` 中取缓存的 vnode 就好了，所以组件 1 和组件 2 能被正常缓存。同理，只在二级导航之间切换路由，组件 3 和组件 4 的缓存也没有问题。

但是，当我们从二级导航切到一级导航的时候， 由于外层`<keep-alive/>`需要先渲染二级 routerView 的容器，也就是`SettingIndex`组件，而这个组件的 name 并不存在于`include`数组中，于是直接返回了新生成的`SettingIndex`的 vnode，而二级导航里的页面（组件3，组件4），都是`SettingIndex`的子组件，故而也都是新的，所以缓存失效。

也就是说，如果想要缓存二级 routerView 里的页面，需要先在一级 `<keep-alive/>`里缓存他们的父组件。



## 3.解决方法

**解决方法 1**

最直接的解决方式就是在一级 routerView 里的 `<keep-alive/>` 的`include`数组里再加一个`settingIndex` 

```diff
export default {
  data(){
-    return { cachedViews:["role","account"] }
+    return { cachedViews:["role","account","settingIndex"] }
  }
};
</script>
```

**解决方法 2**

 把路由拍平，导航可以还是多级导航，但是路由不嵌套。

 **解决方法 3**

vue 是一个`<keepAlive/>`里维护一份`cache`和`key`。如果我们的`cache`和`keys`全局唯一，就不会有这个问题。所以我们可以自己写一个 `<keepAlive/>`，全局维护需要缓存的组件，比如：把`cache`和`key`挂在 window 上或存到 vuex 里。


<!-- cjh todo -->
<!-- keepalive 里套routerview，routerview 里套子组件, 路由变化 router view 视图更新，应该是子组件触发 render 啊， keepalive 的 render 为啥要执行呢？？？
(虽然确实是因为 keepalive 的 render 执行了才导致了读cache) -->