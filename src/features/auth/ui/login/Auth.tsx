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
import {captchaTC, errorHandler, loginTC, selectCaptcha, selectIsLoggedIn} from "@/app/app-slice.ts";
import {useLazyGetCaptchaQuery, useLoginMutation} from "@/features/auth/api/authapi.ts";
import {ResultCode} from "@/common/enum/enum.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {AUTH_TOKEN} from "@/common/constants";
import {useEffect} from "react";

export const Login = () => {
  const dispatch = useAppDispatch();
  const logined = useAppSelector(selectIsLoggedIn);
  const [login, {data: loginData,}] = useLoginMutation();
  const [fetchCaptcha, {data: captchaData}] = useLazyGetCaptchaQuery();
  const captcha = useAppSelector(selectCaptcha);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors },
  } = useForm<LoginInputs>({
    defaultValues: { email: "", password: "", rememberMe: false, captcha: "" },
    resolver: zodResolver(loginSchema),
  });

  // Обработка ответа сервера
  useEffect(() => {
    if (loginData?.resultCode === ResultCode.CaptchaError) {

      fetchCaptcha();
      dispatch(captchaTC({captcha: true}));
      setError('root', {message: loginData.messages[0]});
    }
  }, [loginData, dispatch, fetchCaptcha, setError]);

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const res = await login(data).unwrap();

      if (res.resultCode === ResultCode.Success) {
        dispatch(captchaTC({captcha: false}));
        dispatch(loginTC({isLoggedIn: true}));
        dispatch(errorHandler({error: null}));
        localStorage.setItem(AUTH_TOKEN, res.data.token);

        const ws = new WebSocket('ws://localhost:8080');
        ws.onopen = () => {
          ws.send(JSON.stringify({
            type: 'AUTH',
            token: res.data.token
          }));
        };

        reset();
      }
    } catch (error) {
      console.error("Login error:", error);
      reset({password: ''});
    }
  };

  if (logined) {
    return <Navigate to={Path.Main} />;
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
                  sx={{ fontSize: "24px" }}
                  label="Email"
                  type={"email"}
                  margin="normal"
                  color={"secondary"}
                  size={"medium"}
                  {...register("email")}
              />
              {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}

              <TextField
                  sx={{ color: "secondary" }}
                  type="password"
                  label="Password"
                  margin="normal"
                  {...register("password")}
              />
              {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}

              {errors.root && <span className={styles.errorMessage}>{errors.root.message}</span>}

              <FormControlLabel
                  sx={{ color: "white" }}
                  control={
                    <Controller
                        name="rememberMe"
                        control={control}
                        render={({ field }) => (
                            <Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={field.value} />
                        )}
                    />
                  }
                  label={"Remember me"}
              />

              {captcha && (
                  <Grid container justifyContent={"center"} direction={'column'}>
                    <Grid sx={{ marginTop: 2 }}>
                      <img src={captchaData?.url} alt="captcha" style={{ width: "100%" }} />
                    </Grid>
                    <TextField
                        required
                        label="Type captcha"
                        variant="standard"
                        {...register('captcha')}
                        error={!!errors.captcha}
                        helperText={errors.captcha?.message}
                    />
                  </Grid>
              )}

              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
  );
};