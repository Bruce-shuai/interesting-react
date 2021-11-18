import React, { useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage';

const ChatContactsContext = React.createContext();

export function useChatContacts() {
  return useContext(ChatContactsContext);
}

export  function ChatContactsProvider({children}) {
  /**
   * contact对象包含以下几个属性：
   * 
   * id: 具有唯一性，由uuidV4生成
   * username: 用户名，由用户自己定义
   * signature: 个性签名，由用户自己定义
   * avatar: 个人头像，由系统随机分配
   */
  // TODO: 有可能我之后会弄自定义头像功能，但目前不会弄...
  const [contacts, setContacts] = useLocalStorage('chat-contacts', []);

  function createContact(id, username, signature, avatar) {
    setContacts(prevContacts => {
      return [...prevContacts, {id, username, signature, avatar}]
    })
  }

  return (
    <ChatContactsContext.Provider value={{ contacts, createContact}}>
      {children}
    </ChatContactsContext.Provider>
  )
}
