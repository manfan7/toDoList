import { createTheme } from "@mui/material/styles"
import { ThemeMode } from "@/app/app-slice.ts"

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#ef6c00",
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-input": {
              color: themeMode === "light" ? "white" : "white",
              backgroundColor: "transparent", // Цвет текста
            },
            "& .MuiInputLabel-root": {
              color: "white",
              backgroundColor: "transparent", // Цвет лейбла
            },
            input: {
              fontSize: "16px",
              color: themeMode === "light" ? "white" : "white",
            },
          },
        },
      },
    },
  })
}
