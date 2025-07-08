import { v1 } from "uuid"
import { ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { selectThemeMode } from "@/app/app-selectrors.ts"
import { getTheme } from "@/common/theme/theme.ts"
import { Header } from "@/common/components/Header/Header.tsx"
import styles from "./App.module.css"
import { ErrorSnackBar } from "@/common/components/ErrorSnackBar/ErrorSnackBar.tsx"
import { Routing } from "@/common/routing/Routing.tsx"

export type FilterValue = "ALL" | "Active" | "Completed"
export const tdId1 = v1()
export const tdId2 = v1()

export type toDotype = {
  id: string
  title: string
  filter: FilterValue
}

export let toDo: toDotype[] = [
  { id: tdId1, title: "What to learn", filter: "ALL" },
  { id: tdId2, title: "What to buy", filter: "ALL" },
]

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

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
