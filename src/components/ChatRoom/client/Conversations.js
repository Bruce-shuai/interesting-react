import React, { useState } from 'react'
import Message from './Message';
import ConversationItem from './ConversationItem';
import { useChatConversations } from '../../../context/ChatConversationsContext';

export default function Conversations() {

  const [selected, setSelected] = useState(0);  // 当前选中的聊天群
  
  const {conversations, selectConversation} = useChatConversations();

  function handleClickSelected(index) {
    setSelected(index)
    selectConversation(index);
  }


  return (
    <div className="chat-conversations__container">

      {/* 聊天内容左侧 <---> 聊天群 */}
      <div className="chat-conversations__left">
      {
        conversations.map((conversation, index) => {
          // TODO: 等聊天室功能大体实现完成后，对于内容信息聊天的群组(conversation) 可以进行任意的删除
          return <div 
              key={index} 
              className={`chat-conversations__item ${selected === index && 'chat-conversations__item--selected'}`} 
              onClick={() => handleClickSelected(index)}
            >
            <ConversationItem conversation={conversation} key={index}/>
          </div>
        })
      }
      </div>

      {/* 聊天内容右侧 <---> 聊天发送与内容显示 */}
      <div className="chat-Conversations__right"><Message /></div>
    </div>
  )
}
