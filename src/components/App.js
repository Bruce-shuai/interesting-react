import Plans from "./Plans/Index";
import PhotoEdit from './PhotoEdit/Index';
import Signup from "./Authentication/Signup";
import Login from "./Authentication/Login";
import AuthProvider from "../context/AuthContext";
import Dashboard, {RequireAuth} from "./Authentication/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import {useAuth} from '../context/AuthContext';
import ForgetPassword from "./Authentication/ForgetPassword";
import UpdateProfile from "./Authentication/UpdateProfile";
import HomePage from "./HomePage";


// import PrivateRoute from "./PrivateRoute";
function App() {
  document.title="Interesting React"
  return (
    <AuthProvider>
      <HomePage />

      {/* 注意：这里是需要重定向的(当用户还没登录的时候) 这里才用的是react-router-v6的新方法 */}
      {/* <Routes>
        <Route path="/" element={
          <RequireAuth redirectTo="/login">
            <Dashboard />
          </RequireAuth>
        } />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="forget-password" element={<ForgetPassword />} />
        <Route path="update-profile" element={<UpdateProfile />} />
      </Routes> */}
    </AuthProvider>
  );
}

export default App;
