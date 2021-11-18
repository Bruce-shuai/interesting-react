import React from 'react'
import ChatRoom from './ChatRoom';
import { ChatContactsProvider } from '../../../context/ChatContactContexts';
import { ChatConversationsProvider } from '../../../context/ChatConversationsContext';

export default function ChatWrapper() {
  return (
  <ChatContactsProvider>
    <ChatConversationsProvider>
      <ChatRoom />
    </ChatConversationsProvider>
  </ChatContactsProvider>
  )
}
