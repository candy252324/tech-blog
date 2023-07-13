# websocket 

基于 uni 的 [websocket api](https://uniapp.dcloud.net.cn/api/request/websocket.html#connectsocket) 封装。

主要做的事情：
- 心跳
- 断线重连
- 暴露收/发消息函数给页面使用


## 核心代码
```js
const messageCbQueue = {} // 收到消息后需要执行的回调  { key1: fn1, key2:fn2 }

// 创建 WebSocket 连接
 socketTask = uni.connectSocket({
    url: `${url}?token=${token}`,  // 当前登录 token
    success: () => {
      return socketTask 
    },
  })
    // 监听 WebSocket 连接打开事件
  socketTask.onOpen((res) => {
    // TODO 一些状态/标记的重置, timer 的清除
    startHeartbeat() // 客户端开启心跳
    // 消息接收
    socketTask.onMessage((res) => {
      const data = JSON.parse(res.data)
      Object.keys(messageCbQueue).forEach(key => messageCbQueue[key](data)) 
  })

  // 监听WebSocket错误
  uni.onSocketError((res) => {
    reconnect() // 重连
  })

  // 监听 WebSocket 连接关闭事件
  socketTask.onClose(() => {
    //
  })
```

**心跳函数：**

每 5s 给后端发送一条指定格式的消息，如果消息发送失败，则认为断连，执行重连函数。
>刚开始客户端并没有做心跳，而是完全依赖于服务端心跳，如果服务端心跳失败，会主动断开 websocket 连接，客户端监听到连接关闭事件（`socketTask.onClose`），发起重连。这种仅服务端做心跳当时出现的问题是，断连事件有时候监听不到（`socketTask.onClose` 并没有执行），客户并不知道连接断开了，不会发起重连。所以，后面客户端也做了心跳。

```js
function startHeartbeat(){
  _heartbeatInterval = setInterval(() => {
    const data = { key: 'heartbeat', data: {} }
    socketTask.send({
      data: JSON.stringify(data),
      success: () => {
        console.log('客户端发送心跳')
      },
      fail: (err) => {
        reconnect()  // 发送失败，开始重连
      },
    })
  }, 5000)
}
```

**重连函数：**

每 5s 执行一次重连。

>这里遇到了一个坑：
写法 1 在手机长时间息屏之后再亮屏（具体多长时间不清楚），重连函数不执行，但是短时间息屏没有问题。
原因看起来和手机长时间息屏杀进程有关，此时 `_reconnectTimer` 变量非空, 但是对应的回调函数被清除了。
 

```js
function reconnect() {
  // 写法 1：存在重连 timer 则 return
  // if (_reconnectTimer)  
  //   return

  // 写法 2：存在重连 timer 则清除
  _reconnectTimer && clearTimeout(_reconnectTimer)

  _reconnectTimer = setTimeout(() => {
    connectSocket()
    _reconnectTimer = null
  }, 5000)
}
```

**暴露给页面收发消息函数：**

```js
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

/** 客户端发送消息 */
function sendSocketMessage(data, successCb, failCb){
   socketTask.send({
      data,
      success: () => successCb && successCb(),
      fail: err => failCb && failCb(err),
    })
}

export {
  onSocketMessage,
  sendSocketMessage
}
```

页面使用：
```js
// example.vue
import { onSocketMessage } from 'xxx/xxx'
onSocketMessage('chat_room', data=>{})  // 收
sendSocketMessage()  // 发
```

## 如何保证消息的可靠投递

消息的可靠性，即消息的不丢失和不重复。

以下是别人的做法：[参考](http://www.52im.net/thread-294-1-1.html)
<img :src="$withBase('/imgs/im/guaranteed.png')" style="transform:scale(0.7);">

文字描述一下上面图片的过程：
- 1. client-A向im-server发送一个消息请求包，即msg:R
- 2. im-server在成功处理后，回复client-A一个消息响应包，即msg:A
- 3. 如果此时client-B在线，则im-server主动向client-B发送一个消息通知包，即msg:N（当然，如果client-B不在线，则消息会存储离线）

以上三步只能说明im-server成功接收到了消息，并不能说明client-B接收到了消息，要想让发送方client-A确保接收方client-B收到了消息，必须让接收方client-B给一个消息的确认

- 5. client-B向im-server发送一个ack请求包，即ack:R
- 6. im-server在成功处理后，回复client-B一个ack响应包，即ack:A
- 7. 则im-server主动向client-A发送一个ack通知包，即ack:N

至此，主动发送消息的client-A，在收到了ack:N报文后，才能确认client-B真正接收到了消息。

以下是我们的做法：
<img :src="$withBase('/imgs/im/our-guaranteed.png')" style="transform:scale(0.7);">

1. 前端的每一条消息都会携带`clientMessageId`, 如果收到后端推过来的数据包含相同的`clientMessageId`, 则清空输入框
2. 如果没收到后端`clientMessageId`相同的推送，则认为客户端消息可能发送失败（实际上数据可能已经入库了），此时输入框不清空，用户可以重复发送，所以后端需要根据`clientMessageId`进行去重
3. 前端每收到一条`type`为 `‘MESSAGE’` 的后端推送，都会对应给后端发一条 `key` 为 `"message_ack"`推送，用于告诉后端你的推送我收到了，如果后端没收到前端 `key` 为 `"message_ack"`的推送，后端就认为客户端没收到消息，会重推一次

<img :src="$withBase('/imgs/im/ack.png')">







