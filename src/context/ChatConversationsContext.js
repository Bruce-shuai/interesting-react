import React, {useContext, useState} from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useChatContacts } from './ChatContactContexts';
import { useAuth } from './AuthContext';

const ChatConversationsContext = React.createContext();


export function useChatConversations() {
  return useContext(ChatConversationsContext);
}

export function ChatConversationsProvider({children}) {
  const [conversations, setConversations] = useLocalStorage('chat-conversations', [])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const {currentUser} = useAuth()

  const { contacts } = useChatContacts();

  // 用于格式化 conversations
  // conversation 包含属性： recipients(所选联系人的id)、 messages(交流的信息)
  const formattedConversations = conversations.map((conversation, index) => {  // conversation 表示每一轮创建的新聊天
    const recipients = conversation.recipients.map(recipient => {
      // 从联系人id，找到联系人的所有信息
      const contact = contacts.find((contact) => {
       return contact.id === recipient
      })
      return {id: recipient, username: contact.username, avatar: contact.avatar}
    })
    const selected = index === selectedConversationIndex
    return {...conversation, recipients, selected}   // 目的是让conversation里的属性 recipients不再仅仅包含联系人的id，还应该包含联系人的名称
  })


  function createConversation(recipients) {
    setConversations(prevConversations => {
      // 这里的用法其实挺有意思的
      return [...prevConversations, { recipients, messages: []}]
    })
    // console.log('conversations...', conversations);
  }

  // 这里的内容有待进一步斟酌
  function addMessageToConversation({recipients, text, sender}) {
    setConversations(prevConversations => {
      let madeChange = false;
      const newMessage = {sender, text}
      const newConversations = prevConversations.map(   // 这里的创建大法真的妙啊
        conversation => {
          if (arrayEquality(conversation.recipients, recipients)) {  // 这个方法是怎样使用的？
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage]
            }
          }
        return conversation;
      })

      if (madeChange) {
        return newConversations
      } else {
        return [
          ...prevConversations,
          {recipients, messages: [newMessage]}
        ]
      }
    })
  }

  function sendMessage(recipients, text) {
    addMessageToConversation({recipients, text, sender:currentUser.email});   // 这里的email firebase里用户的email
  }

  const value = {
    conversations: formattedConversations,    // 这里的conversations和useState里的conversations不太一样(这里的是格式化后的conversations)
    selectedConversation: formattedConversations[selectedConversationIndex],
    selectConversation: setSelectedConversationIndex,
    sendMessage,
    createConversation
  }

  return (
    <ChatConversationsContext.Provider value={value}>
      {children}
    </ChatConversationsContext.Provider>
  )
}


function arrayEquality(a, b) {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  })
}