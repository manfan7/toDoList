import { createAppSlice } from "@/common/utils"
import type { LoginInputs } from "@/features/auth/lib/shemas"
import { authApi } from "@/features/auth/api/authapi.ts"
import { authResponseShema, authShema, responseShema } from "@/common/types"
import { changeLoading, errorHandler } from "@/app/app-slice.ts"
import { handleServerError } from "@/common/utils/handleServerErrors.ts"
import { AUTH_TOKEN } from "@/common/constants"
import { ResultCode } from "@/common/enum/enum.ts"
import { handleAppError } from "@/common/utils/handleAppErrors.ts"

export const authSlice = createAppSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: (create) => ({
    loginTC: create.asyncThunk(
      async (data: LoginInputs, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeLoading({ status: "loading" }))
          const res = await authApi.login(data)
          authResponseShema.parse(res.data)
          localStorage.setItem(AUTH_TOKEN, res.data.data.token)
          dispatch(changeLoading({ status: "succeeded" }))
          dispatch(errorHandler({ error: null }))
          return {
            isLoggedIn: true,
          }
        } catch (e) {
          handleServerError(dispatch, e)
          return rejectWithValue(e)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn || state.isLoggedIn
        },
      },
    ),
    logoutTc: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          const res = await authApi.logout()
          responseShema.parse(res.data)
          localStorage.removeItem(AUTH_TOKEN)

          return {
            isLoggedIn: false,
          }
        } catch (e) {
          handleServerError(dispatch, e)
          return rejectWithValue(e)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
    authMe: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeLoading({ status: "loading" }))
          const res = await authApi.authMe() // Исправлено на authMe (было authme)
          authShema.parse(res.data) // Исправлено название схемы

          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeLoading({ status: "succeeded" }))
            return {
              isLoggedIn: true,
            }
          } else {
            handleAppError(dispatch, res.data)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerError(dispatch, error)
          dispatch(changeLoading({ status: "failed" }))
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
  }),
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const { selectIsLoggedIn } = authSlice.selectors
export const { loginTC, logoutTc, authMe } = authSlice.actions
export const authReducer = authSlice.reducer
