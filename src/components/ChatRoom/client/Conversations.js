import React from 'react'
import ConversationItem from './ConversationItem';
import { useChatConversations } from '../../../context/ChatConversationsContext';

export default function Conversations() {
  const {conversations} = useChatConversations();
  console.log('conversations', conversations);
  return (
    <div className="Chat-Conversations__container">
      <div className="Chat-Conversations__right">
      {
        conversations.map((conversation, index) => {
          return <div key={index} className="Chat-Conversations__item">
            <ConversationItem conversation={conversation} key={index}/>
          </div>
        })
      }
      </div>
      <div className="Chat-Conversations__left">left</div>
    </div>
  )
}
