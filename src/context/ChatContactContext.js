import React, {useContext} from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage';

const ChatContactContext = React.createContext();

export function useChatContacts() {
  return useContext(ChatContactContext);
}

export  function ChatContactProvider({children}) {
  const [contacts, setContacts] = useLocalStorage('chat-contacts', []);
  
  function createContact(username) {
    setContacts(prevContacts => {
      return [...prevContacts, {username}]
    })
  }

  return (
    <ChatContactContext.Provider value={{ contacts, createContact}}>
      {children}
    </ChatContactContext.Provider>
  )
}
