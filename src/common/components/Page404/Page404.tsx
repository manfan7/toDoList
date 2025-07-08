import { Link } from "react-router"
import styles from "./Page404.module.css"
import Button from "@mui/material/Button"
import { Path } from "@/common/routing/Routing.tsx"
import LaunchIcon from "@mui/icons-material/Launch"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"

export const Page404 = () => {
  return (
    <Container maxWidth={"xl"}>
      <Grid container spacing={2} direction={"column"} size={8} alignItems={"center"}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>page not found</h2>
        <Button
          variant="outlined"
          size={"small"}
          component={Link}
          to={Path.Main}
          color="secondary"
          startIcon={<LaunchIcon />}
          sx={{
            border: "3px solid primary",
            filter: "saturate(1.5)",
            fontSize: 28,

            backgroundColor: "rgba(38, 21, 35,0.2)",
          }}
        >
          Return toStart page via click
        </Button>
      </Grid>
    </Container>
  )
}
