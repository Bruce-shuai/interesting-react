import React, {useState} from 'react'
import { Form, Input, Button, Divider } from 'antd';
// import { use} from '



export default function Message() {

  const [text, setText] = useState('');

  function onFinish({text}) {
    // console.log('value', value);
    setText(text)
  }



  return (
    <div className="chat-message__container">
      Message
      <div>
      <Divider />
      <Form
        // {...formItemLayout}
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
