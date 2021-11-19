import React, {useState} from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from 'react-router-dom';

/* 这是v6的新特性。原来的PrivateRoute 不再好用！这种方法，让未登录认证的用户是无法进入profile路由的 */
export const RequireAuth = ({children, redirectTo}) => {
  let {currentUser:isAuthenticated} = useAuth();
  // console.log('isAuthenticated', isAuthenticated);
  return isAuthenticated ? children : <Navigate to={redirectTo} />
}


export default function Dashboard() {
  let navigate = useNavigate();
  const {currentUser, logout} = useAuth();
  const [error, setError] = useState('');
  async function handleLogOut() {
    try {
      setError('')
      await logout();
      navigate('/login');
    } catch {
      setError('退出失败')
    }
  }
  return (
    <div className="auth__container">
      <div className="auth-profile">
        <div className="cancel">  {/* 样式有待修改 */}
          <button className="btn btn--remove"><Link to="/">&times;</Link></button>
        </div>
        <div className="auth-profile__title">
        个人信息
        </div>
        {error && <div className="info info--error tr-2">{error}</div>}
        {/* 这里的样式有待修改 */}
        <div><strong>用户名:</strong>{currentUser?.displayName}</div>
        <div><strong>手机号码:</strong>{currentUser?.phoneNumber}</div>
        <div><strong>邮箱:</strong>{currentUser?.email}</div>
        <button className="btn btn--hollow mt-1">    {/* 这里的样式有待修改 */}
          <Link to="/update-profile">编辑信息</Link>
        </button>
        <button className="btn btn--hollow mt-1" onClick={() => {handleLogOut()}}>退出账户</button>
      </div>
    </div>
  )
}
