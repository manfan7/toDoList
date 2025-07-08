import { Route, Routes } from "react-router"
import { Main } from "@/app/Main.tsx"
import { Login } from "@/features/auth/ui/login/Auth.tsx"
import { Page404 } from "@/common/components/Page404/Page404.tsx"

export const Path = {
  Main: "/",
  Login: "login",
  page404: "*",
} as const

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.Main} element={<Main />} />
      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.page404} element={<Page404 />} />
    </Routes>
  )
}
