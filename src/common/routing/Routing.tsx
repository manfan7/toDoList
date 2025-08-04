import { Route, Routes } from "react-router"
import { Main } from "@/app/Main.tsx"
import { Login } from "@/features/auth/ui/login/Auth.tsx"
import { Page404 } from "@/common/components/Page404/Page404.tsx"
import { Faq } from "@/features/FAQ/ui"
import { ProtectedRoutes } from "@/common/components/ProtectedRoutes/ProtectedRoutes.tsx"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import {selectIsLoggedIn} from "@/app/app-slice.ts";


export const Path = {
  Main: "/",
  Login: "login",
  page404: "/*",
  Faq: "/Faq",
} as const

export const Routing = () => {
  const logined = useAppSelector(selectIsLoggedIn)
  return (
    <Routes>
      <Route element={<ProtectedRoutes isAllowed={logined} redirectPath={Path.Login} />}>
        <Route path={Path.Main} element={<Main />} />
        <Route path={Path.Faq} element={<Faq />} />
      </Route>
      <Route element={<ProtectedRoutes isAllowed={!logined} redirectPath={Path.Main} />}>
        <Route path={Path.Login} element={<Login />} />
      </Route>

    <Route path={Path.page404} element={<Page404 />} />
    </Routes>
  )
}
