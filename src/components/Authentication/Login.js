import { Form, Input, Button, Checkbox } from 'antd';
import { useState } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default function Login() {

  const onFinish = ({email, password}) => {
    console.log('email', email);
    console.log('password', password);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="auth__container">
      <div className="auth__form">
      <div className="auth__form-title">登录</div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 20,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
      <Form.Item
        label="邮箱"
        name="email"
        rules={[
          {
            required: true,
            message: '请输入你的邮箱!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="邮箱"/>
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            message: '请输入你的密码',
          },
        ]}
      >
        <Input.Password  prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="密码"/>
      </Form.Item>
      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>请记住我</Checkbox>
      </Form.Item>
      <Form.Item    // 这个到时候可能会改一下...
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" loading>
          提交
        </Button>
      </Form.Item>
      </Form>
      <div className="auth__jump">没有账户？注册</div>
      </div>
    </div>
  )
}
