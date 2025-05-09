import {FilterValue, toDoStateType} from "../App.tsx";
import {v1} from "uuid";
import {createAction} from "@reduxjs/toolkit";

export const RemoveToDoListAC = createAction<{id:string}>('todolists/removeToDoList')
/*export const RemoveToDoListAC = (todolistId:string):RemoveTodoListActionType=>{
    return {
        type: 'REMOVE-TODOLIST',
        payload:{
            id: todolistId
        }

    }
}*/


export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTotodlistActionType = {
    type: 'ADD-TODOLIST',
    title: string,
 id:string
}
export type ChangeTotodlistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string
    id: string
}
export type ChangeTotodlistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValue
}

type ActionTypes =
    RemoveTodoListActionType
    | AddTotodlistActionType
    | ChangeTotodlistFilterActionType
    | ChangeTotodlistTitleActionType
const initialState: toDoStateType = []
export const ToDoListReducer = (state: toDoStateType=initialState, action: ActionTypes): toDoStateType => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(item => item.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: action.id, title: action.title, filter: 'ALL'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(item => item.id === action.id ? {...item, title: action.title} : item)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(item => item.id === action.id ? {...item, filter: action.filter} : item)
        default:
            return state

    }
}

export const AddtoDoListAC = (title:string):AddTotodlistActionType=>{
    const id = v1()
    return {
        type: 'ADD-TODOLIST', title,id
    }
}
export const ChangeTitleAC = (title:string,id:string):ChangeTotodlistTitleActionType=>{
    return {
        type: 'CHANGE-TODOLIST-TITLE', title,id
    }
}
export const ChangeFilterAC = (filter:FilterValue,id:string):ChangeTotodlistFilterActionType=>{
    return {
        type: 'CHANGE-TODOLIST-FILTER', filter,id
    }
}