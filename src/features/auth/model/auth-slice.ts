import { createAppSlice } from "@/common/utils"
import type { LoginInputs } from "@/features/auth/lib/shemas"
import { authApi } from "@/features/auth/api/authapi.ts"
import { authResponseShema } from "@/common/types"
import { changeLoading } from "@/app/app-slice.ts"
import { handleServerError } from "@/common/utils/handleServerErrors.ts"

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
          dispatch(changeLoading({ status: "succeeded" }))
          return {
            isLoggedIn: true,
          }
        } catch (e) {
          handleServerError(dispatch, e)
          return rejectWithValue(e)
        }

        // логика санки для авторизации
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn || state.isLoggedIn
        },
      },
    ),
  }),
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const { selectIsLoggedIn } = authSlice.selectors
export const { loginTC } = authSlice.actions
export const authReducer = authSlice.reducer
