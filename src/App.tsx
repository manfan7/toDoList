import { ThemeProvider } from "@mui/material/styles"
import { CircularProgress, CssBaseline } from "@mui/material"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { selectThemeMode } from "@/app/app-selectrors.ts"
import { getTheme } from "@/common/theme/theme.ts"
import { Header } from "@/common/components/Header/Header.tsx"
import styles from "./App.module.css"
import { ErrorSnackBar } from "@/common/components/ErrorSnackBar/ErrorSnackBar.tsx"
import { Routing } from "@/common/routing/Routing.tsx"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { useEffect, useState } from "react"
import { authMe } from "@/features/auth/model/auth-slice.ts"

export type FilterValue = "ALL" | "Active" | "Completed"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const [isinit, setIsinit] = useState(false)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(authMe()).then(() => {
      setIsinit(true)
    })
  }, [])
  if (!isinit) {
    return (
      <div className={styles.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.app}>
        <Header />
        <Routing />
        {/*<Test />*/}
      </div>
      <ErrorSnackBar />
    </ThemeProvider>
  )
}
