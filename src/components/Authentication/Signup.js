import {useState} from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';

export default function Signup() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const {signup} = useAuth();
  const onFinish =  async ({email, password}) => {
    try {
      setError('');
      setLoading(true)
      await signup(email, password);  // 注意，这里返回的是promise
    } catch(e) {
      if (e.message === 'Firebase: The email address is badly formatted. (auth/invalid-email).') {
        setError('您的邮箱格式错误！');
      }
      else {
        setError(e.message);
      }
    } finally {
      setLoading(false)
    }
    
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="auth__container">
      <div className="auth__form">
        <div className="auth__form-title">注册</div>
        {error && <div className={`info ${error ? 'info--error' : 'info--success'} tr-2`}>{error}</div>}
        <Form
          name="basic"
          labelCol={{
            span: 10,
          }}
          wrapperCol={{
            span: 28,
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
          name="confirm"
          label="验证密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '请验证您输入的密码!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('你两次输入的密码不匹配!'));
              },
            }),
          ]}
        >
          <Input.Password />
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
          <Button type="primary" htmlType="submit" loading={loading}>
            提交
          </Button>
        </Form.Item>

        </Form>
        <div className="auth__jump">已经有账户？登录</div>
      </div>
    </div>
  )
}
