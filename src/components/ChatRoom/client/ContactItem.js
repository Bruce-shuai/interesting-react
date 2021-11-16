import React from 'react'
import { Avatar, Image, Tooltip } from 'antd';


export default function ContactItem({contact}) {

  let {username, signature, avatar} = contact;
  signature = signature == null ? '' : signature;
  let shortSignature = signature.length <= 9 ? signature : signature.substr(0,9) + '...';

  return (
    <div className="chat-contact-item">
      <Avatar src={`${contact.avatar}`} shape="square" />
      <div>
        <div className="chat-contact-item__username">{username}</div>
        <Tooltip placement="rightBottom" title={signature}>
          <div className="chat-contact-item__signature">{shortSignature}</div>
        </Tooltip>
      </div>
    </div>
  )
}
