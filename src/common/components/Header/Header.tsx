import Toolbar from "@mui/material/Toolbar"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Typography from "@mui/material/Typography"
import { NavButton } from "@/common/components/NavButton/NavButton.tsx"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
import AppBar from "@mui/material/AppBar"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"

import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { changeThemeModeAC, selectThemeMode } from "@/app/app-slice.ts"
import { LinearProgress } from "@mui/material"
import { selectLoadingState } from "@/app/app-selectrors.ts"
import { Link } from "react-router"
import { Path } from "@/common/routing/Routing.tsx"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const loading = useAppSelector(selectLoadingState)
  const dispatch = useAppDispatch()
  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#3c0b3a",
        mb: "30px",
      }}
    >
      <Toolbar>
        <Container maxWidth={"xl"}>
          <Grid container alignItems={"center"} spacing={2}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
                to={Path.Main}
              >
                {" "}
                Igor Grytsuk{" "}
              </Link>
            </Typography>

            <NavButton>Sign in</NavButton>
            <NavButton>Sign up</NavButton>
            <NavButton background={"#7a6bd1"}>FAQ</NavButton>
            <FormControlLabel
              control={<Switch color={"default"} onChange={changeMode} defaultChecked />}
              label="Change theme"
            />
          </Grid>
        </Container>
      </Toolbar>
      {loading === "loading" && <LinearProgress color="secondary" />}
    </AppBar>
  )
}
