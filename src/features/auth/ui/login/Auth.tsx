import Grid from "@mui/material/Grid"
import { FormControl, FormGroup, FormLabel, TextField } from "@mui/material"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"
import styles from "./Login.module.css"
import { type LoginInputs, loginSchema } from "@/features/auth/lib/shemas"
import { zodResolver } from "@hookform/resolvers/zod"
export const Login = () => {
  //const themeMode = useAppSelector(selectThemeMode)

  //const theme = getTheme(themeMode)
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginInputs>({
    defaultValues: { email: "", password: "", rememberMe: false },

    resolver: zodResolver(loginSchema),
  })
  const onSubmit: SubmitHandler<LoginInputs> = () => {
    reset()
  }

  return (
    <Grid container justifyContent={"center"}>
      <FormControl>
        <FormLabel color={"secondary"}>
          <Typography variant="caption" gutterBottom sx={{ display: "block", color: "white" }}>
            To login get registered
          </Typography>
          <Typography variant="caption" gutterBottom sx={{ display: "block", color: "white" }}>
            <b>Email:</b> free@samuraijs.com Its example
          </Typography>
          <Typography variant="caption" gutterBottom sx={{ display: "block", color: "white" }}>
            <b>Password:</b> free
          </Typography>
        </FormLabel>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <TextField
              sx={{
                fontSize: "24px",
              }}
              label="Email"
              type={"email"}
              margin="normal"
              color={"secondary"}
              size={"medium"}
              {...register("email")}
            />
            {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
            <TextField type="password" label="Password" margin="normal" {...register("password")} />
            {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
            <FormControlLabel
              sx={{
                color: "white",
              }}
              control={
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field }) => (
                    <Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={field.value} />
                  )}
                />
              }
              label={"Remeber me"}
            />

            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </form>
      </FormControl>
    </Grid>
  )
}
