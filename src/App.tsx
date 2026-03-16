import { Route, Routes } from "react-router"
//import { useUser } from "reactfire"
import RootLayout from "./layouts/root.layout"
import PublicLayout from "./layouts/public.layout"
import HomePage from "./pages/public/home.page"
import NotFountPage from "./pages/public/not-fount.page"
import AdminLayout from "./layouts/admin.layout"
import DashboardPage from "./pages/admin/dashboard.page"
import ProfilePage from "./pages/admin/profile.page"
import ChatPage from "./pages/admin/chat.page"
import LoginPage from "./pages/auth/login.page"
import RegisterPage from "./pages/auth/register.page"
import AuthLayout from "./layouts/auth.layout"

const App = () => {


  return (
    <Routes>
      <Route element= {<RootLayout/>}>
        <Route element= {<PublicLayout/>}>
          <Route index element= {<HomePage/>}/>
          <Route path="*" element= {<NotFountPage/>}/>
        </Route>

        <Route path="admin" element= {<AdminLayout/>}>
          <Route index element= {<DashboardPage/>}/>
          <Route path="profile" element= {<ProfilePage/>}/>
          <Route path="chat" element= {<ChatPage/>}/>
        </Route>

        <Route path="auth" element= {<AuthLayout/>}>          
          <Route path="login" element= {<LoginPage/>}/>
          <Route path="register" element= {<RegisterPage/>}/>
        </Route>

      </Route>
    </Routes>
  )
}

export default App
