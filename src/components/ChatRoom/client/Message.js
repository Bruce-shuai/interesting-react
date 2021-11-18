import React, {useState} from 'react'
import { Form, Input, Button, Divider } from 'antd';
import { useChatConversations } from '../../../context/ChatConversationsContext';

export default function Message() {

  // const [text, setText] = useState('');
  const { selectedConversation, sendMessage } = useChatConversations();
  function onFinish({text}) {

    // 强烈注意：这里的selectedConversation 中的recipients是格式化后的数据
    // 但是传入sendMessage函数里面的recipients 只是包含有id数据的内容
 
    const recipients = selectedConversation.recipients.map((recipient) => recipient.id);   // TODO 这里的id属性的内容有点奇怪
    sendMessage(recipients, text)
  }

  return (
    // TODO 这里的样式布局有点问题，整体聊天内容做完之后，再来修改
    <div className="chat-message__container">

      {/* 信息显示部分 */}
      <div>
        Message
      </div>

      {/* 信息输入部分*/}
      <div>
        <Divider />
        <Form
          layout="inline"
          onFinish={onFinish}
          autoComplete="off"
          className="chat-message__form"
        >
          <Form.Item  wrapperCol={{ span: 24 }} name="text" >
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 3 }} className="chat-message__text-area"/>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 8 }}>
            <Button type="primary" size="large"  htmlType="submit" >发送</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
