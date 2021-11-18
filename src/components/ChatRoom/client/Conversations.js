import React, {useState} from 'react'
import ConversationItem from './ConversationItem';
import { useChatConversations } from '../../../context/ChatConversationsContext';
import Message from './Message';
export default function Conversations() {
  const {conversations, selectConversation} = useChatConversations();
  // console.log('conversations', conversations);
  const [selected, setSelected] = useState(-1);

  function handleClickSelected(index) {
    setSelected(index)
    selectConversation(index);
  }


  return (
    <div className="chat-conversations__container">
      <div className="chat-conversations__right">
      {
        conversations.map((conversation, index) => {
          return <div key={index} className={`chat-conversations__item ${selected === index ? 'chat-conversations__item--selected':''}`} onClick={() => handleClickSelected(index)}>
            <ConversationItem conversation={conversation} key={index}/>
          </div>
        })
      }
      </div>
      <div className="chat-Conversations__left"><Message /></div>
    </div>
  )
}
