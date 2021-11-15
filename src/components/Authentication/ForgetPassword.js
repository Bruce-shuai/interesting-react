import { Form, Input, Button} from 'antd';
import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  let navigate = useNavigate();
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const {resetPassword} = useAuth();

  const onFinish = async ({email}) => {
    try {
      setError('');
      setSuccess('');
      setLoading(true)
      await resetPassword(email);  // 注意，这里返回的是promise
      setSuccess('重置密码成功!')
      setTimeout(() => {
        navigate('/login')
      }, 1000)
      // clearTimeout(timer);
    } catch(e) {
      if (e.message === 'Firebase: The email address is badly formatted. (auth/invalid-email).') {
        setError('邮箱格式错误!');
      }
      else if (e.message === 'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).') {
        setError('此邮箱未注册过账号!')
      }
      else {
        setError(e.message)
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
      <div className="auth__form-title">密码</div>
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
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" loading={loading}>
          重置密码
        </Button>
      </Form.Item>
      </Form>
      <div className="ta-center">
        <Link to="/login">登录</Link>
      </div>
      </div>
    </div>
  )
}
