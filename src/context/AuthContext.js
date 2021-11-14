import React, {useState, useEffect, useContext} from 'react'
import {auth} from '../firebase';

// 为了让用户认证效果全局有效，必须使用context
const AuthContext = React.createContext();



// 创建一个自定义钩子，方便全局享用用户认证的相关数据（不必每次有一个模块需要调用useContext、AuthContext才能获取全局auth数据）
export const useAuth = () => {
  return useContext(AuthContext);
}

export default function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    // 会返回一个promise...
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return auth.signOut();
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }
  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }
  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  /* 设置当前用户 */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false); // 保证用户数据成功加载完后才显示界面, 这样会避免一些错误... 
    })
    return unsubscribe;
    // 由于[] 是 空数组。则只会在组件被销毁的时候，这个返回值(unsubscribe)才会被执行
  }, [])

  const value = {
    currentUser,        // 用户信息
    signup,             // 注册方法
    login,              // 登录方法
    logout,             // 退出方法
    resetPassword,      // 重置密码(忘记密码->找回密码)
    updateEmail,        // 更新邮箱
    updatePassword      // 更新密码
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
