import React from 'react'
import { Form, Input, Button } from 'antd';
import {useChatContacts} from '../../../context/ChatContactContext';

export default function ContactModal({closeModal}) {

  const { createContact } = useChatContacts();

  const onFinish = (values) => {
    console.log('Success:', values);
    createContact(values.username)
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
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          确认
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}
