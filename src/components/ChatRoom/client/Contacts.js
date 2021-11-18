import React from 'react'
import { useChatContacts } from '../../../context/ChatContactContexts'
import ContactItem from './ContactItem';

export default function Contacts() {
  const {contacts} = useChatContacts();
  return (
    <div>
      { contacts.map((contact) => <div key={contact.id}><ContactItem contact={contact}/></div>) }
    </div>
  )
}
