import {configureStore} from "@reduxjs/toolkit"
import {appSlice, AppSlice} from "@/app/app-slice.ts"
import {todolistsApi} from "@/features/todolists/api/todolistsApi.ts";
import {setupListeners} from "@reduxjs/toolkit/query";
import {baseApi} from "@/features/todolists/api/baseApi.ts";
import {captchaApi} from "@/features/auth/api/authapi.ts";

// объединение reducer'ов с помощью combineReducers
//const rootReducer = combineReducers()

// создание store
export const store = configureStore({
    reducer: {
       [captchaApi.reducerPath]:captchaApi.reducer,
        [appSlice.name]: AppSlice,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(todolistsApi.middleware).concat(captchaApi.middleware)
})
setupListeners(store.dispatch)
// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
