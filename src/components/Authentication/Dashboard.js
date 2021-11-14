import React, {useState} from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, Navigate } from "react-router-dom";

/* 这是v6的新特性。原来的PrivateRoute 不再好用！这种方法，让未登录认证的用户是无法进入profile路由的 */
export const RequireAuth = ({children, redirectTo}) => {
  let {currentUser:isAuthenticated} = useAuth();
  console.log('isAuthenticated', isAuthenticated);
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
        <div className="auth-profile__title">
        个人信息
        </div>
        {error && <div className="info info--error tr-2">{error}</div>}
        <div><strong>邮箱:</strong>{currentUser?.email}</div>
        {/* <button></button> */}
        <button className="btn btn--hollow mt-1" onClick={() => {handleLogOut()}}>退出账户</button>
      </div>
    </div>
  )
}
