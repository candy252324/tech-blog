# 消息

<img :src="$withBase('/imgs/im/chatroom.png')" style="transform:scale(0.9);">

## 客户端发送的数据格式

客户端发送的消息内容类型一期只做了两种 `{ contentType: 'IMG' }` 和 `{ contentType: 'TEXT' }`。

回复类型有三种：`{ applyType: ''}` => 普通消息发送 ， `{ applyType: 'REPLY'}`=> 引用 ， `{ applyType: 'FORWARD'}` => 转发。

以下为一条消息引用的发送数据格式：
```js
const data = {
  key: 'message',
  data: {
    groupIdList: ['1661181034727968768'], // 接收对象 id
    contentType: 'TEXT',  // 文本消息
    content: '哇哦！',     // 消息内容
    clientMessageId: '3b1af559-12a1-4234-b086-a78f86dc446c',  // 客户端生成的 id 
    applyType: 'REPLY',   // 引用
    cardMessageList: ['1661305926865620992'], // 被引用的消息id
    channel: 'ios',
    timestamp: 1689256162482,
  },
}
```
## 客户端接收的数据格式

在我们的系统中，总的来说，客户端接收的消息类型有三种：
- 1. `type:'CHAT'` 用于首页消息列表的消息插入、更新等
- 2. `type:'MESSAGE'` 用于聊天对话框中的消息显示

  里面又有 5 种类型
  - TEXT文本 
  - LINK链接 （前端发的时候类型是TEXT,后端返的时候是LINK）
  - TIP提示消息 (如： xxx 加入群聊)
  - IMG图片 
  - AUDIO语音 
  - VIDEO视频 
  - FILE文件
- 3. `type:'MESSAGE_RECEIVED'` 服务端给客户端的 ack ,表示消息已经入库了，用于客户端清空输入框等操作 
- 4. `type:'PING'` 心跳


以下为上一条消息发送后收到服务端消息：
```js
// 服务端的 ack ,告知客户端消息已经成功收到，客户端做清空聊天对话框操作
const data1 = {
  code: '200',
  data: {
    receiver: '1660970401055084544',
    sender: '1660970401055084544',
    groupId: '1661181034727968768',
    clientMessageId: '3b1af559-12a1-4234-b086-a78f86dc446c', // 将客户端发送的 clientMessageId 原样返回
  },
  timestamp: 1689256162870,
  type: 'MESSAGE_RECEIVED',
}
// 用于客户端页面显示的数据
const data2 = {
  code: '200',
  data: {
    applyType: 'REPLY',
    receiver: '1660970401055084544',
    created: '2023-07-13 21:49:22',
    groupId: '1661181034727968768',
    senderAvatar: 'https://xxx',  // 发送者头像
    // 被引用消息内容
    cardMessageList: [
      {
        senderId: '1660970401055084544',
        senderName: '陈加欢',
        created: '2023-05-24 17:39:33',
        senderAvatar: 'https://xxx',
        messageId: '1679488191441932288',
        contentType: 'TEXT',
        content: '你好',
      },
    ],
    messageId: '1679488191433543680',
    isAt: false,
    content: '哇哦！', // 发送内容
    isAttention: false,
    sequence: '1679488191433543681',
    senderName: '陈加欢',
    sender: '1660970401055084544',
    msgTime: '2023-07-13 21:49:22',
    contentType: 'TEXT',
    clientMessageId: '3b1af559-12a1-4234-b086-a78f86dc446c',
  },
  timestamp: 1689256162884,
  type: 'MESSAGE',
}
```

## 消息列表
1. 已经存在的会话，更新内容并置顶
2. 不存在的会话，插入到最顶部
3. 息屏再亮屏，调 http 接口获取最新的列表数据
4. 以上三种情况都需要更新tab上的未读红点总数

## 聊天对话框

- 1. 消息引用

所有的消息类型都可以被引用。

- 2. 单条转发

所有的消息都可以被单条转发（其实就是普通消息发送）。

- 3. 合并转发

除合并转发记录不可以再次被合并转发外，其它都可以。

- 4. 聊天对话框会有disable的情况
 
 disable 影响顶部 title 的展示和 tooltip 的选项。



