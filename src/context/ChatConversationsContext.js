import React, {useContext, useEffect, useState, useCallback} from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useChatContacts } from './ChatContactContexts';
import { useAuth } from './AuthContext';
import { useSocket } from './SocketContext';

const ChatConversationsContext = React.createContext();

export function useChatConversations() {
  return useContext(ChatConversationsContext);
}

export function ChatConversationsProvider({children}) {
  /**
   * conversation对象包含以下属性(未格式化)：
   * recipients: 所选联系人的email信息
   * messages: 所选联系人讨论的信息
   */
  const [conversations, setConversations] = useLocalStorage('chat-conversations', [])  // 但是谈话内容全部存放在localStorage里面会不会让内存过大呢？

  // console.log('-----', conversations);   // 我可以知道，conversations 是未格式化的

  /**
   * setectedConversationIndex 为选中的conversation
   */
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

  const { currentUser } = useAuth()       // 获取用户的个人信息
  const { contacts } = useChatContacts(); // 获取所有联系人的信息
  const socket = useSocket();


  // 用于格式化 conversations
  // conversation 包含属性： recipients(所选联系人的email)、 messages(交流的信息)
  // 格式化后 conversation 包含属性： recipients(所选联系人的id, 用户名, 头像)、 messages(所选联系人讨论的信息)
  const formattedConversations = conversations.map((conversation, index) => {  // conversation 表示每一轮创建的新聊天

    // 格式化 recipients
    const recipients = conversation.recipients.map(recipient => {
      // 从联系人email，找到联系人的所有信息
      const contact = contacts.find(contact => {
       return contact.email === recipient
      })
      return {id: recipient, email: contact?.email, username: contact?.username, avatar: contact?.avatar}
    })

    // 格式化 messages
    const messages = conversation.messages.map(message => {
      const contact = contacts.find(contact => {
        return contact.email === message.sender
      })
      
      const fromMe = message?.sender === currentUser?.email
      // 这里的内容感觉有待改正...
      const senderName = contact?.username ? contact?.username : currentUser.displayName
      return {...message, senderName, fromMe}
    })
    const selected = index === selectedConversationIndex
    return {...conversation, recipients, selected, messages}   // 目的是让conversation里的属性 recipients不再仅仅包含联系人的id，还应该包含联系人的名称
  })

  /**
   * 增
   * 创建新的conversation
   * @param recipients 这里只包括联系人的email
   */
  function createConversation(recipients) {
    setConversations(prevConversations => {
      // 这里的用法其实挺有意思的
      return [...prevConversations, { recipients, messages: []}]
    })
  }

  // 这里的useCallback 以及回调等操作好好研究研究
  const addMessageToConversation = useCallback(({recipients, text, sender}) => {
    setConversations(prevConversations => {
      let madeChange = false;
      const newMessage = {sender, text};
      const newConversations = prevConversations.map(                
        conversation => {
          if (arrayEquality(conversation.recipients, recipients)) {  // 匹配对应的联系人...
            madeChange = true;
            // 老样子的增删改查
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage]
            }
          }
          return conversation;
        }
      )

      if (madeChange) {
        return newConversations
      } else {
        return [
          ...prevConversations,
          // 现在recipients 里的是未格式化的数据
          {recipients, messages: [newMessage]}
        ]
      }
    })
  }, [setConversations])

  useEffect(() => {
    if (socket == null) return 
    socket.on('receive-message', addMessageToConversation)

    return () => socket.off('receive-message')
  }, [socket, addMessageToConversation])

  /**
   * 
   * @param {*} recipients 
   * @param {*} text 发送的数据
   * @param {*} sender 用户的email
   */
  function sendMessage(recipients, text) {

    socket.emit('send-message', {recipients, text})

    addMessageToConversation({recipients, text, sender:currentUser.email});   // 这里的email firebase里用户的email
  }

  // console.log('formattedConversations', formattedConversations);
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
  // 这里的sort目的是无视群内联系人的顺序
  a.sort();
  b.sort();
  // every 用法用得很不错...
  return a.every((element, index) => {
    return element === b[index];
  })
}