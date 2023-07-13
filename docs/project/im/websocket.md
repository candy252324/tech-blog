# websocket 通信

基于 uni 的 [websocket api](https://uniapp.dcloud.net.cn/api/request/websocket.html#connectsocket) 封装。

## 核心代码：
```js
const messageCbQueue = {} // 收到消息后需要执行的回调  { key1: fn1, key2:fn2 }

 socketTask = uni.connectSocket({
    url: `${url}?token=${token}`,
    success: () => {
      console.log('正准备建立websocket中...')
      return socketTask 
    },
  })
    // 监听 WebSocket 连接打开事件
  socketTask.onOpen((res) => {
    // TODO 清除重连timer, 服务端 alive 检测 timer
   
    socketTask.onMessage((res) => {
      console.log('收到服务器发送的消息!')
      const data = JSON.parse(res.data)
      Object.keys(messageCbQueue).forEach(key => messageCbQueue[key](data))
  })

  // 监听WebSocket错误
  uni.onSocketError((res) => {
    reconnect() // 重连timer
  })

  // 监听 WebSocket 连接关闭事件
  socketTask.onClose(() => {
    //
  })


/**
 * 接收消息
 * @param uniKey 自己定义一个唯一 key, 不要和别人重了就行
 * @param cb 收到消息的回调
 */
function onSocketMessage(uniKey, cb) {
  if (!uniKey || typeof cb !== 'function')
    return
  messageCbQueue[uniKey] = cb
}

export {
  onSocketMessage,
}


```

## 页面使用

```js
// example.vue
import { onSocketMessage } from 'xxx/xxx'
onSocketMessage('chat_room', data=>{})
```

## 如何保证可靠投递

[可以参考](http://www.52im.net/thread-294-1-1.html)

我们的做法：

1. 前端的每一条消息都会携带clientMessageId, 如果收到后端推过来的数据包含相同的clientMessageId, 则清空输入框
2. 如果没收到后端clientMessageId相同的推送，则认为客户端消息可能发送失败（实际上数据可能已经入库了），输入框不清空，用户可以重复发送，所以后端需要根据clientMessageId进行去重
3. 前端每收到一条type为‘MESSAGE’的后端推送，都会对应给后端发一条 key 为 "message_ack"推送，用于告诉后端你的推送我收到了，如果后端没收到前端 key 为 "message_ack"的推送，后端就认为我可能没收到消息，会重推一次

<img :src="$withBase('/imgs/im/ack.png')">







