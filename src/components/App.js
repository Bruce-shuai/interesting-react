import Plans from "./Plans/Index";
import PhotoEdit from './PhotoEdit/Index';
import Signup from "./Authentication/Signup";
import Login from "./Authentication/Login";
import AuthProvider from "../context/AuthContext";
import Dashboard, {RequireAuth} from "./Authentication/Dashboard";
import { Routes, Route } from "react-router-dom";
import ForgetPassword from "./Authentication/ForgetPassword";
import UpdateProfile from "./Authentication/UpdateProfile";
import CloudDisk from "./CloudDisk/Index";
import HomePage from "./HomePage";
import NotFound from "./NotFound";
import ChatWrapper from "./ChatRoom/client/Index";
import Folder from '../components/CloudDisk/Folder'
// import PrivateRoute from "./PrivateRoute";
function App() {
  document.title="Interesting React"
  return (
    <AuthProvider>
      {/* 注意：这里是需要重定向的(当用户还没登录的时候) 这里才用的是react-router-v6的新方法 */}
      <Routes> 
        {/* 主页 */}
        <Route path="/" element={
          <RequireAuth redirectTo="/login">
            <HomePage />
          </RequireAuth>
        } />
        {/* 个人身份认证页 */}
        <Route path="/profile" element={
          <RequireAuth redirectTo="/login">
            <Dashboard />
          </RequireAuth>
        } />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="forget-password" element={<ForgetPassword />} />
        <Route path="update-profile" element={<UpdateProfile />} />
        {/* 下面四个页面皆有重定向功能 */}
        {/* 计划列表页 */}
        <Route path="/plans" element={
          <RequireAuth redirectTo="/login">
            <Plans />
          </RequireAuth>
        } />
        {/* 图片编辑页 */}
        <Route path="photo-edit" element={
          <RequireAuth redirectTo="/login">
            <PhotoEdit />
          </RequireAuth>
        } />
        {/* 聊天室页 */}
        <Route path="chat-room" element={
          <RequireAuth redirectTo="/login">
            <ChatWrapper />
          </RequireAuth>
        } />
        {/* 文件管理页 */}
        <Route path="cloud-disk" element={
          <RequireAuth redirectTo="/login">
            <CloudDisk />
          </RequireAuth>
        }>
          <Route path=":folderId" element={<Folder/>} />
        </Route>
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
