import { Form, Input, Button, Checkbox } from 'antd';
import { useState } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
export default function Login() {
  let navigate = useNavigate();
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const {login} = useAuth();

  const onFinish = async ({email, password}) => {
    try {
      setError('');
      setSuccess('');
      setLoading(true)
      await login(email, password);  // 注意，这里返回的是promise
      setSuccess('登录成功!')
      // navigate('/')
      setTimeout(() => {
        navigate('/')
      }, 1000)
      // clearTimeout(timer);
    } catch(e) {
      if (e.message === 'Firebase: The email address is badly formatted. (auth/invalid-email).') {
        setError('您的邮箱格式错误！');
      }
      else if (e.message === 'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).') {
        setError('抱歉，用户不存在！')
      }
      else if (e.message === 'Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).') {
        setError('您输入的密码有错误！')
      }
      else if (e.message === 'Firebase: A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred. (auth/network-request-failed).') {
        setError('网络中断！')
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
      <div className="auth__form-title">登录</div>
      {error && <div className="info info--error tr-2">{error}</div>}
      {success && <div className="info info--success tr-2">{success}</div>}
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
        <Button type="primary" htmlType="submit" loading={loading}>
          确认
        </Button>
      </Form.Item>
      <Form.Item    // 这个到时候可能会改一下...
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" danger htmlType="button" className="tl-1">
          <Link to="/forget-password" className="border-green">忘记密码</Link>
        </Button>
      </Form.Item>
      </Form>

      <div className="auth__jump">没有账户？<Link to="/signup">注册</Link></div>   {/* 注意：这里的Link路径加上 '/' 和 不加 '/' 有明显的区别哦~*/}
      </div>
    </div>
  )
}
