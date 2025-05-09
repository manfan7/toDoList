import {FilterValue,toDoStateType, toDotype} from "../App.tsx";

import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";


const initialState: toDoStateType = [
]
export const removeToDoListAC = createAction<{id:string}>('todolists/removeToDoList')
export const changeTitleAC = createAction<{title:string,id:string}>('todolists/CHANGE-TODOLIST-TITLE')
export const addtoDoListAC = createAction(
    'todolists/ADD-TODOLIST',
    (title: string) => ({
        payload: {
            title,
            id: nanoid()
        }
    })
);
export const changeFilterAC = createAction<{filter:FilterValue,id:string}>('todolists/CHANGE-TODOLIST-FILTER')

export const toDoListReducer= createReducer(initialState,(builder)=>{
    builder.addCase(removeToDoListAC,(state,action)=>{
        const index = state.findIndex(todo => todo.id === action.payload.id)
        if (index !== -1) state.splice(index, 1)
    })
        .addCase(changeTitleAC,(state,action)=>{
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state[index].title = action.payload.title
        })
        .addCase(addtoDoListAC,(state,action)=>{
            const newItem:toDotype =  {...action.payload, filter: 'ALL'}
            state.push(newItem)
        })
        .addCase(changeFilterAC,(state,action)=>{
            const index = state.findIndex(i=>i.id===action.payload.id)
            if(index!==-1) state[index].filter=action.payload.filter
        })
})


