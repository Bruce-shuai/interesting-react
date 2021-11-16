import {useState} from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, EditOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  let navigate = useNavigate();
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const {currentUser, updateEmail, updatePassword, changeUserInfo} = useAuth();
  const onFinish = ({email, password, displayName, phoneNumber}) => {
    setError('');
    setSuccess('');
    setLoading(true)
    // 这里的内容很有意思  要使用 Promise.All
    const promises = [];
    if (displayName !== currentUser?.displayName && phoneNumber !== currentUser?.phoneNumber) {
      /* 更新用户信息 */
      const newUserInfo = {
        displayName,
        phoneNumber
      }
      console.log('newUserInfo', newUserInfo);
      promises.push(changeUserInfo(newUserInfo))
    }
    if (email !== currentUser.email) {
      promises.push(updateEmail(email))
    }
    if (password) {
      promises.push(updatePassword(password))
    }
    Promise.all(promises).then(() => {
      setTimeout(() => {
        setSuccess('更改成功')
      }, 1000)
      navigate('/')
    }).catch(e => {
      setError(e.message);
    }).finally(() => {
      setLoading(false)
    })  
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="auth__container">
      <div className="auth__form">
        <div className="auth__form-title">更改信息</div>
        {error && <div className="info info--error tr-2">{error}</div>}
        {success && <div className="info info--success tr-2">{success}</div>}
        <Form
          name="basic"
          labelCol={{
            span: 10,
          }}
          wrapperCol={{
            span: 28,
          }}
          initialValues={{
            remember: false,
          }}
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
        <div className="ta-center">(可修改任意一项)</div>  
        <Form.Item
          label="新用户名"
          name="displayName"
          rules={[
            {
              required: false,
              message: '请输入你的用户名!',
            },
          ]}
        >
          <Input prefix={<EditOutlined className="site-form-item-icon" />} placeholder={`${currentUser ? currentUser.displayName : ''}`}/>
        </Form.Item>
        <Form.Item
          label="新电话号码"
          name="phoneNumber"
          rules={[
            {
              required: false,
              message: '请输入你的电话号码!',
            },
          ]}
        >
          <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder={`${currentUser ? currentUser.phoneNumber : ''}`}/>
        </Form.Item>
        <Form.Item
          label="新邮箱"
          name="email"
          rules={[
            {
              required: false,
              message: '请输入你的邮箱!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={`${currentUser ? currentUser.email : ''}`}/>
        </Form.Item>
        <Form.Item
          label="新密码"
          name="password"
          rules={[
            {
              required: false,
              message: '请输入你的密码',
            },
          ]}
        >
          <Input.Password  prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="设置新密码"/>
        </Form.Item>
        <Form.Item
          name="confirm"
          label="验证密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: false,
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
        <div className="ta-center">
        <Button type="primary" danger htmlType="button" className="tl-1">
          <Link to="/profile" className="ta-center">取消</Link> 
        </Button>
        </div>
      </div>
    </div>
  )
}
