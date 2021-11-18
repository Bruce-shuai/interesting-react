import React from 'react'
import { Avatar, Tooltip } from 'antd'


export default function ConversationItem({conversation}) {
  // console.log('conversation', conversation);
  return (
    <div>
      {
        conversation.recipients.map(recipient => {
          // Danger 当前这里是有问题的..
          return <div key={recipient.id} className="chat-conversation-item__recipient">
            <Avatar src={`${recipient.avatar}`} shape="square" />
            <div>
              {recipient.username}
            </div>
          </div>
        })
      }
    </div>
  )
}
