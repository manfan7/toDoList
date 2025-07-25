import {ThemeProvider} from "@mui/material/styles"
import {CssBaseline} from "@mui/material"
import {useAppSelector} from "@/common/hooks/useAppSelector.ts"
import {selectThemeMode} from "@/app/app-selectrors.ts"
import {getTheme} from "@/common/theme/theme.ts"
import {Header} from "@/common/components/Header/Header.tsx"
import styles from "./App.module.css"
import {ErrorSnackBar} from "@/common/components/ErrorSnackBar/ErrorSnackBar.tsx"
import {Routing} from "@/common/routing/Routing.tsx"
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts"
import {useEffect, useState} from "react"

import {useAuthMeQuery} from "@/features/auth/api/authapi.ts";
import {ResultCode} from "@/common/enum/enum.ts";
import {loginTC} from "@/app/app-slice.ts";

export type FilterValue = "ALL" | "Active" | "Completed"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const [isinit, setIsinit] = useState(false)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()
    const {data,isLoading} = useAuthMeQuery()

  useEffect(() => {
  if(!isLoading){
      setIsinit(true)
  }
  if(data?.resultCode===ResultCode.Success){
      dispatch(loginTC({isLoggedIn:true}))
  }
  }, [isLoading])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.app}>
        <Header />
          {isLoading && (<div className={styles.circularProgressContainer}>
              Wait please.....
          </div>)}
          {isinit && <Routing />}

        {/*<Test />*/}
      </div>
      <ErrorSnackBar />
    </ThemeProvider>
  )
}
