import React from 'react'
import { useChatConversations } from '../../../context/ChatConversationsContext'
export default function MessageShow() {

  const {selectedConversation} = useChatConversations();
  // console.log('conversation', selectedConversation);
  // const {messages} = selectedConversation;
  // 这里的样式书写属实有点难度
  return (
    <div className="chat-message-show">
      {
        selectedConversation?.messages.map((message, index) => <div key={index} className="chat-message-show__item">
          <div className="chat-message-show__info">{message.text}</div>
          <div className="chat-message-show__user">{message.fromMe ? '我' : '其他人'}</div>
        </div> )
      }
    </div>
  )
}
