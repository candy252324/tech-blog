# diff算法

diff 算法发生在新旧 vnode 同时存在, 且新 vnode 不是文本节点，且新旧 vnode 都有孩子的情况下。

掌握diff算法有一个需要知道的前提是：vnode上会记录当前节点对应的真实dom（`vnode.elm`），及父节点dom(`vnode.elm.parentNode`)。

```js
/**
 * 对比新老节点，找出其中的不同，然后更新老节点
 * @param {*} oldVnode 老节点的 vnode
 * @param {*} vnode 新节点的 vnode
 */
function patchVnode(oldVnode, vnode) {
  // 如果新老节点相同，则直接结束
  if (oldVnode === vnode) return

  // 将老 vnode 上的真实节点同步到新的 vnode 上，否则，后续更新的时候会出现 vnode.elm 为空的现象
  vnode.elm = oldVnode.elm

  // 走到这里说明新老节点不一样，则获取它们的孩子节点，比较孩子节点
  const ch = vnode.children
  const oldCh = oldVnode.children

  if (!vnode.text) { // 新节点不存在文本节点
    if (ch && oldCh) { // 说明新老节点都有孩子
      // diff 
      updateChildren(ch, oldCh)
    } else if (ch) { // 老节点没孩子，新节点有孩子
      // 增加孩子节点
    } else { // 新节点没孩子，老节点有孩子
      // 删除这些孩子节点
    }
  } else { // 新节点存在文本节点
    if (vnode.text.expression) { // 说明存在表达式
      // 获取表达式的新值
      const value = JSON.stringify(vnode.context[vnode.text.expression])
      // 旧值
      try {
        const oldValue = oldVnode.elm.textContent
        if (value !== oldValue) { // 新老值不一样，则更新
          oldVnode.elm.textContent = value
        }
      } catch {
        // 防止更新时遇到插槽，导致报错
        // 目前不处理插槽数据的响应式更新
      }
    }
  }
}
```

主要看一下 `updateChildren` 这个方法，这就是vue2的**双端比较**，其实就是假设了四种可能的情况，用于降低时间复杂度。

```js
/**
 * diff，比对孩子节点，找出不同点，然后将不同点更新到老节点上
 * @param {*} ch 新 vnode 的所有孩子节点
 * @param {*} oldCh 老 vnode 的所有孩子节点
 */
function updateChildren(ch, oldCh) {
  // 四个游标
  // 新孩子节点的开始索引，叫 新开始
  let newStartIdx = 0
  // 新结束
  let newEndIdx = ch.length - 1
  // 老开始
  let oldStartIdx = 0
  // 老结束
  let oldEndIdx = oldCh.length - 1
  // 循环遍历新老节点，找出节点中不一样的地方，然后更新
  while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) { // 根据 web 中的 DOM 操作特点，做了四种假设，降低时间复杂度
    // 新开始节点
    const newStartNode = ch[newStartIdx]
    // 新结束节点
    const newEndNode = ch[newEndIdx]
    // 老开始节点
    const oldStartNode = oldCh[oldStartIdx]
    // 老结束节点
    const oldEndNode = oldCh[oldEndIdx]
    if (sameVNode(newStartNode, oldStartNode)) { // 假设新开始和老开始是同一个节点
      // 对比这两个节点，找出不同然后更新
      patchVnode(oldStartNode, newStartNode)
      // 移动游标
      oldStartIdx++
      newStartIdx++
    } else if (sameVNode(newStartNode, oldEndNode)) { // 假设新开始和老结束是同一个节点
      patchVnode(oldEndNode, newStartNode)
      // 将老结束移动到新开始的位置
      oldEndNode.elm.parentNode.insertBefore(oldEndNode.elm, oldCh[newStartIdx].elm)
      // 移动游标
      newStartIdx++
      oldEndIdx--
    } else if (sameVNode(newEndNode, oldStartNode)) { // 假设新结束和老开始是同一个节点
      patchVnode(oldStartNode, newEndNode)
      // 将老开始移动到新结束的位置
      oldStartNode.elm.parentNode.insertBefore(oldStartNode.elm, oldCh[newEndIdx].elm.nextSibling)
      // 移动游标
      newEndIdx--
      oldStartIdx++
    } else if (sameVNode(newEndNode, oldEndNode)) { // 假设新结束和老结束是同一个节点
      patchVnode(oldEndNode, newEndNode)
      // 移动游标
      newEndIdx--
      oldEndIdx--
    } else {
      // 上面几种假设都没命中，则老老实的遍历，找到那个相同元素
    }
  }
  // 跳出循环，说明有一个节点首先遍历结束了
  if (newStartIdx < newEndIdx) { // 说明老节点先遍历结束，则将剩余的新节点添加到 DOM 中

  }
  if (oldStartIdx < oldEndIdx) { // 说明新节点先遍历结束，则将剩余的这些老节点从 DOM 中删掉

  }
}
```

```js
/**
 * 判断两个节点是否相同
 * 这里的判读比较简单，只做了 key 和 标签的比较
 */
function sameVNode(n1, n2) {
  return n1.key == n2.key && n1.tag === n2.tag
}
```

举个具体的例子描述一下这个双端比较过程：

假设新 vnode 是 a => b => c => d

假设旧 vnode 是 d => a => c => b => e

此时的 Dom 顺序应和旧 vnode 一致  D => A => C => B => E

第一次 while 循环，发现新 vnode 的最后一个元素和旧 vnode 的第一个元素相同，都为 d ，走`sameVNode(newEndNode, oldStartNode)`逻辑。此时 newEndIdx 为 3，则 `oldCh[newEndIdx].elm.nextSibling` 对应的 dom 是 E。将当前dom D 插入到 dom E 的前面，所以第一次 while 循环后的 dom 顺序变成了 A => C => B => D => E

<img :src="$withBase('/imgs/myvue/vue2-diff1.jpg')" style="transform:scale(0.8)" title="第一次 while 循环">



> 关于 insertBefore 有一个小的知识点：第二个参数必传，但是可以为 null 或 undefined, 如果为 null 或 undefined，则元素会被插入到最后面。如：`listDom.insertBefore(newDom, referDom)`, 如果参考节点为 null 或 undefined， 则 newDom 将会被插入到 listDom 的最后面。

第二次 while 循环，走`sameVNode(newStartNode, oldStartNode)`分支，只需要更新dom内容和移动游标位置即可，不需要移动 dom 位置。

<img :src="$withBase('/imgs/myvue/vue2-diff2.jpg')" style="transform:scale(0.8)" title="第二次 while 循环">

第三次 while 循环 ，走 `sameVNode(newEndNode, oldStartNode)`，此时 newEndIdx 为 2，则 `oldCh[newEndIdx].elm.nextSibling` 对应的 dom 是 D。将当前dom C 插入到 dom D 的前面，所以第三次 while 循环后的 dom 顺序变成了 A => B => C => D => E

<img :src="$withBase('/imgs/myvue/vue2-diff3.jpg')" style="transform:scale(0.8)" title="第三次 while 循环">

第四次 while 循环 ，走 `sameVNode(newStartNode, oldStartNode)`，只需要更新dom内容和移动游标位置即可，不需要移动 dom 位置。
<img :src="$withBase('/imgs/myvue/vue2-diff4.jpg')" style="transform:scale(0.8)" title="第四次 while 循环">

第四次 while 循环后，由于 newStartIdx > newEndIdx, 不满足 while 循环的条件，跳出循环。同时 oldStartIdx 为3，oldEndIdx为 4， oldStartIdx < oldEndIdx，说明老节点中有多余节点，则将剩余的这些老节点从 DOM 中删掉。









