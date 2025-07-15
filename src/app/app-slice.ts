import { createSlice } from "@reduxjs/toolkit"
import type { RequestStatus } from "@/common/types"

export type ThemeMode = "dark" | "light"

export const appSlice = createSlice({
  name: "APP",
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as null | string,
    isLoggedIn: false,
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    changeLoading: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    errorHandler: create.reducer<{ error: null | string }>((state, action) => {
      state.error = action.payload.error
    }),
    loginTC: create.reducer<{isLoggedIn:boolean}>((state, action)=>{
      state.isLoggedIn=action.payload.isLoggedIn
    })
  }),
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectLoadingState: (state) => state.status,
    selectError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const AppSlice = appSlice.reducer
export const { changeThemeModeAC, changeLoading, errorHandler,loginTC } = appSlice.actions
export const { selectThemeMode, selectLoadingState, selectError,selectIsLoggedIn } = appSlice.selectors
