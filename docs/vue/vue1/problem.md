# vue1存在的问题


Vue1.x 中 Watcher 和模版中响应式数据是一一对应关系，也就是说页面中每引用一次响应式数据，就会产生一个 Watcher。

这在中小型 web 系统中是没有任何问题的，而且相比于 Vue2.x 性能会更好，因为响应式数据更新时，Watcher 可以直接更新对应的 DOM 节点，没有2.x的 VNode 开销和 Diff 过程。但是在大型系统中，一个页面的数据量是非常大的，那就会产生大量的 Watcher,占用大量资源，导致性能下降。

所以总的来说就是，Vue1.x 在中小型系统中性能会很好，定向更新 DOM 节点，但是大型系统由于 Watcher 太
多，导致资源占用过多，性能下降。