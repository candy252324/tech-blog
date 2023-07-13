# 消息

总的来说，客户端接收的消息类型有三种：
1. `type:'CHAT'` 用于首页消息列表的消息插入、更新等
2. `type:'MESSAGE'` 用于聊天对话框中的消息显示
3. `type:'PING'` 心跳
<img :src="$withBase('/imgs/im/chatroom.png')" style="transform:scale(0.9);">


