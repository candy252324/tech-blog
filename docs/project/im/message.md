# 消息

在我们的系统中，总的来说，客户端接收的消息类型有三种：
- 1. `type:'CHAT'` 用于首页消息列表的消息插入、更新等
- 2. `type:'MESSAGE'` 用于聊天对话框中的消息显示

  里面又有 5 种类型
  - TEXT文本 
  - LINK链接 
  - TIP提示消息 (如： xxx 加入群聊)
  - IMG图片 
  - AUDIO语音 
  - VIDEO视频 
  - FILE文件
- 3. `type:'MESSAGE_RECEIVED'` 服务端给客户端的 ack ,表示消息发送成功，用于客户端清空输入框等操作 
- 4. `type:'PING'` 心跳
<img :src="$withBase('/imgs/im/chatroom.png')" style="transform:scale(0.9);">


## 消息列表
