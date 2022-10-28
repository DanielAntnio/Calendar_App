import { SignIn } from "../pages/singIn";
import { Route, Routes } from "react-router-dom";
import { LogIn } from "../pages/logIn";
import { PageRoutes } from "./index.routes";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { ForgetPassword } from "../pages/forgetPassword";

export const AuthRoutes = () => {
  const path = window.location.pathname
  const isIn = path === '/login' || path === '/signin' || path === '/fgtPss'

  return (
    <div id={isIn ? '' : 'screen'} className={`${isIn ? 'flex flex-col' : 'grid'} h-screen w-full`}>
      <Header />
      <Routes>
        <Route path="login" element={<LogIn />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="fgtPss" element={<ForgetPassword />} />
        <Route path="/*" element={<PageRoutes />} />
      </Routes>
      <Footer />
    </div>
  )
}