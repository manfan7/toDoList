import Grid from "@mui/material/Grid"
import {FormControl, FormGroup, FormLabel, TextField} from "@mui/material"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import {Controller, type SubmitHandler, useForm} from "react-hook-form"
import styles from "./Login.module.css"
import {type LoginInputs, loginSchema} from "@/features/auth/lib/shemas"
import {zodResolver} from "@hookform/resolvers/zod"

import {useAppSelector} from "@/common/hooks/useAppSelector.ts"
import {Navigate} from "react-router"
import {Path} from "@/common/routing/Routing.tsx"
import {errorHandler, loginTC, selectIsLoggedIn} from "@/app/app-slice.ts";
import {useGetCaptchaQuery, useLoginMutation} from "@/features/auth/api/authapi.ts";
import {ResultCode} from "@/common/enum/enum.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {AUTH_TOKEN} from "@/common/constants";

export const Login = () => {
  //const themeMode = useAppSelector(selectThemeMode)
  //const theme = getTheme(themeMode)
const dispatch = useAppDispatch()
  const logined = useAppSelector(selectIsLoggedIn)
  const [login] = useLoginMutation()
const {data} = useGetCaptchaQuery()

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
  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
  debugger
  login(data).then((res)=>{
      debugger
      if(res.data?.resultCode===ResultCode.Success){
        dispatch(loginTC({isLoggedIn:true}))
        dispatch(errorHandler({error:null}))
        localStorage.setItem(AUTH_TOKEN,res.data.data.token)
      }
      reset()
    }).catch((errors)=>{
      console.log(errors)
      reset({password:''});
    })
  }
  if (logined) {
    return <Navigate to={Path.Main} />
  }

  return (
    <Grid container justifyContent={"center"} spacing={10}>

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
            <TextField sx={{
              color: "secondary",
            }} type="password" label="Password" margin="normal" {...register("password")} />
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
            <Grid container justifyContent={"center"} direction={'column'}>
              <Grid sx={{ marginTop: 2 }}> {/* 2 = 16px */}
                <img src={data?.url} alt="captcha" style={{ width: "100%" }} />
              </Grid>
              <TextField required label="Type captcha" variant="standard" {...register('captcha')} />
            </Grid>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </form>
      </FormControl>

    </Grid>
  )
}
