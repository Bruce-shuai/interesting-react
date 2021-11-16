import React from 'react'
import { Form, Input, Button } from 'antd';
import {useChatContacts} from '../../../context/ChatContactContext';
import { v4 as uuidv4 } from 'uuid';
export default function ContactModal({closeModal}) {

  const { createContact } = useChatContacts();

  const onFinish = (values) => {
    console.log('Success:', values);
    let signature = values.signature == null ? '' : values.signature;
    // 随机头像
    const user = ['julie', 'jaqueline', 'jane', 'jazebelle', 'jacques', 'jeri', 'jolee', 'james', 'jon', 'jack', 'jana']
    const name =  user.sort(function(){
      return Math.random() - 0.5;
    })
    const avatar = `https://joeschmoe.io//api/v1/${name[0]}`;

    
    createContact(uuidv4(), values.username, signature, avatar)
    closeModal();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入你的用户名!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="个性签名"
        name="signature"
        rules={[{ required: false, message: '请输入你的个性签名!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          确认
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}
