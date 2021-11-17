import React, {useContext} from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useChatContacts } from './ChatContactContexts';


const ChatConversationsContext = React.createContext();


export function useChatConversations() {
  return useContext(ChatConversationsContext);
}

export function ChatConversationsProvider({children}) {
  const [conversations, setConversations] = useLocalStorage('chat-conversations', [])
  const { contacts } = useChatContacts();

  // 用于格式化 conversations
  // conversation 包含属性： recipients(所选联系人的id)、 messages(交流的信息)
  const formattedConversations = conversations.map((conversation) => {  // conversation 表示每一轮创建的新聊天
    const recipients = conversation.recipients.map(recipient => {
      // 从联系人id，找到联系人的所有信息
      const contact = contacts.find((contact) => {
       return contact.id === recipient
      })
      return {id: recipient, username: contact.username, avatar: contact.avatar}
    })
    return {...conversation, recipients}   // 目的是让conversation里的属性 recipients不再仅仅包含联系人的id，还应该包含联系人的名称
  })

  function createConversation(recipients) {
    setConversations(prevConversations => {
      // 这里的用法其实挺有意思的
      return [...prevConversations, { recipients, messages: []}]
    })
    // console.log('conversations...', conversations);
  }

  const value = {
    conversations: formattedConversations,    // 这里的conversations和useState里的conversations不太一样(这里的是格式化后的conversations)
    createConversation
  }

  return (
    <ChatConversationsContext.Provider value={value}>
      {children}
    </ChatConversationsContext.Provider>
  )
}


