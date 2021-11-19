import React from 'react'
import ChatRoom from './ChatRoom';
import { ChatContactsProvider } from '../../../context/ChatContactContexts';
import { ChatConversationsProvider } from '../../../context/ChatConversationsContext';
import { SocketProvider } from '../../../context/SocketContext';
import { useAuth } from '../../../context/AuthContext';

export default function ChatWrapper() {
  const {currentUser} = useAuth();
  return (
    // 把currentUser 的emali 当作socket的通信id
    <SocketProvider id={currentUser.email}>
      <ChatContactsProvider>
        <ChatConversationsProvider>
          <ChatRoom />
        </ChatConversationsProvider>
      </ChatContactsProvider>
    </SocketProvider>  
  )
}
