import {tasksListType} from "../App.tsx";


import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";
import {addtoDoListAC, removeToDoListAC} from "./toDoList-reducer.ts";


const initialState: tasksListType = {}
export const removeTaskAC = createAction<{ taskId: string, toDoId: string }>('tasks/REMOVE-TASK')
export const addTaskAC = createAction('tasks/ADD-TASK', (title: string, toDoId: string) => ({
    payload: {title, toDoId, id: nanoid()}
}))
export const changeTaskTitleAC = createAction<{ id: string, toDoId: string, title: string }>('tasks/CHANGE-TASK-TITLE')
export const changeTaskStatusAC = createAction<{
    id: string,
    toDoId: string,
    isDone: boolean
}>('tasks/CHANGE-TASK-STATUS')

export const tasksReducer = createReducer(initialState, (builder) => {
    builder.addCase(removeToDoListAC, (state, action) => {
        delete state[action.payload.id]
    })
        .addCase(addtoDoListAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(removeTaskAC, (state, action) => {
            const index = state[action.payload.toDoId].findIndex(item => item.id === action.payload.taskId)
            index !== -1 && state[action.payload.toDoId].splice(index, 1)
        })
        .addCase(addTaskAC, (state, action) => {
            state[action.payload.toDoId].unshift({...action.payload, isDone: false})
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const index = state[action.payload.toDoId].findIndex(item => item.id === action.payload.id)
            if (index !== -1) {
                state[action.payload.toDoId][index].title = action.payload.title
            }
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const index = state[action.payload.toDoId].findIndex(item => item.id === action.payload.id)
            if (index !== -1) {
                state[action.payload.toDoId][index].isDone = action.payload.isDone
            }
        });
})


