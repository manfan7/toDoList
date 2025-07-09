import { configureStore } from "@reduxjs/toolkit"
import { toDoListReducer, toDoListSlice } from "../features/todolists/model/toDoList-reducer.ts"
import { tasksReducer, tasksSlice } from "../features/todolists/model/tasks-reducer.ts"
import { appSlice, AppSlice } from "@/app/app-slice.ts"
import { authReducer, authSlice } from "@/features/auth/model/auth-slice.ts"

// объединение reducer'ов с помощью combineReducers
//const rootReducer = combineReducers()

// создание store
export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [toDoListSlice.name]: toDoListReducer,
    [appSlice.name]: AppSlice,
    [authSlice.name]: authReducer,
  },
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
