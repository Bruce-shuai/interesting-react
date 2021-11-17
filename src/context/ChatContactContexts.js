import React, {useContext} from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage';

const ChatContactsContext = React.createContext();

export function useChatContacts() {
  return useContext(ChatContactsContext);
}

export  function ChatContactsProvider({children}) {
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
