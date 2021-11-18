import React from 'react'
import ConversationItem from './ConversationItem';
import { useChatConversations } from '../../../context/ChatConversationsContext';
import Message from './Message';
export default function Conversations() {
  const {conversations, selectConversation} = useChatConversations();
  // console.log('conversations', conversations);

  function handleClickSelected(index) {
    selectConversation(index);
  }


  return (
    <div className="Chat-Conversations__container">
      <div className="Chat-Conversations__right">
      {
        conversations.map((conversation, index) => {
          return <div key={index} className="Chat-Conversations__item" onClick={() => handleClickSelected(index)}>
            <ConversationItem conversation={conversation} key={index}/>
          </div>
        })
      }
      </div>
      <div className="Chat-Conversations__left"><Message /></div>
    </div>
  )
}
