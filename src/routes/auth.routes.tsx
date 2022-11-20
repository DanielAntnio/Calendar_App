import { Navigate, Route, Routes } from "react-router-dom";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { LogIn } from "../pages/logIn";
import { SignIn } from "phosphor-react";
import { ForgetPassword } from "../pages/forgetPassword";
import { NotFound } from "../pages/notFound";
import { PageRoutes } from "./index.routes";

export const AuthRoutes = () => {
  const path = window.location.pathname
  const display = path.slice(1, 9) === "calendar" || path === '/' ? 'grid' : 'flex flex-col'
  const isIn = path === '/login' || path === '/signin' || path === '/fgtPss'

  if (isIn) {
    onAuthStateChanged(auth, user => {
      if (!!user) window.location.href = 'calendar'
    });
  }

  return (
    <div id="screen" className={`${display} h-screen w-full`}>
      <Header />
      <Routes>
        <Route path="login" element={<LogIn />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="fgtPss" element={<ForgetPassword />} />
        <Route path="calendar/*" element={<PageRoutes />} />
        <Route path="404" element={<NotFound />} />
        <Route path="/" element={<Navigate to="/calendar" />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      <Footer />
    </div>
  )
}