import Plans from "./Plans/Index";
import PhotoEdit from './PhotoEdit/Index';
import Signup from "./Authentication/Signup";
import Login from "./Authentication/Login";
import AuthProvider from "../context/AuthContext";
function App() {
  document.title="Interesting React"
  
  return (
    <AuthProvider>
      {/* <Login /> */}
      <Signup />
      {/* <PhotoEdit /> */}
      {/* <Plans /> */}
    </AuthProvider>
  );
}


export default App;
