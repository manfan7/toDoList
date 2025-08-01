import { createSlice } from "@reduxjs/toolkit"
import type { RequestStatus } from "@/common/types"
import {todolistsApi} from "@/features/todolists/api/todolistsApi.ts";
import {tasksApi} from "@/features/todolists/api/tasksApi.ts";

export type ThemeMode = "dark" | "light"

export const appSlice = createSlice({
  name: "APP",
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as null | string,
    isLoggedIn: false,
    captchaUrl:null as null|string
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
    }),
    captchaTC:create.reducer<{captcha:null|string}>((state, action)=>{
      state.captchaUrl = action.payload.captcha
    })
  }),
  extraReducers:(builder)=>{
    builder.addMatcher((action)=>{
      if (
          todolistsApi.endpoints.reorderToDoList.matchPending(action) ||
          tasksApi.endpoints.getTasks.matchPending(action)
      ) {
        return
      }
return action.type.endsWith('pending')
    },(state, _action)=>{
state.status='loading'
    })
    builder.addMatcher((action)=>{

      return action.type.endsWith('fulfilled')
    },(state, _action)=>{
      state.status='succeeded'
    })
    builder.addMatcher((action)=>{
      return action.type.endsWith('rejected')
    },(state, _action)=>{
      state.status='failed'
    })
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectLoadingState: (state) => state.status,
    selectError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectCaptcha:(state)=>state.captchaUrl
  },
})

export const AppSlice = appSlice.reducer
export const { changeThemeModeAC, changeLoading, errorHandler,loginTC } = appSlice.actions
export const { selectThemeMode, selectLoadingState, selectError,selectIsLoggedIn,selectCaptcha } = appSlice.selectors
