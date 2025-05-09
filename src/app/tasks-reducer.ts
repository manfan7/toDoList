import {FilterValue, tasksListType} from "../App.tsx";
import {v1} from "uuid";


const initialState = {}


export const TasksReducer = (state: tasksListType = initialState, action: Actions): tasksListType => {
    const {type, payload} = action
    switch (type) {
        case 'REMOVE-TASK':
            return {...state, [payload.toDoId]: state[payload.toDoId].filter(item => item.id !== payload.taskId)}
        case 'ADD-TASK':
            return {
                ...state,
                [payload.toDoId]: [...state[payload.toDoId], {id: payload.taskId, title: payload.title, isDone: false}]
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [payload.toDoId]: state[payload.toDoId].map((item) => item.id === payload.taskId ? {
                    ...item,
                    title: payload.title
                } : item)
            }
        case 'CHANGE-TASK-STATUS':

            return {
                ...state,
                [payload.toDoId]: state[payload.toDoId].map(item => item.id === payload.taskId ? {
                    ...item,
                    isDone: payload.isDone
                } : item)
            }
        case 'FILTER-TASK':
            return {
                ...state,
                [payload.toDoId]: payload.filter === 'ALL'
                    ? state[payload.toDoId]
                    : payload.filter === 'Completed'
                        ? state[payload.toDoId].filter(item => item.isDone)
                        : state[payload.toDoId].filter(item => !item.isDone)
            }
        case 'EMPTY-TASK':
            return {...state, [payload.newTdId]: []}
        case "DELETE-WITH-TODO":
            const newState = {...state}
            delete newState[payload.toDoId]
            return newState
        default:
            return state
    }
}
export const RemoveTaskAC = (taskId: string, toDoId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId,
            toDoId
        }
    } as const
}
export const AddTaskAC = (title: string, toDoId: string) => {
    const taskId = v1()
    return {
        type: 'ADD-TASK',
        payload: {
            title, taskId, toDoId
        }
    } as const
}
export const ChangeTaskTitleAC = (taskId: string, toDoId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            taskId, toDoId, title
        }
    } as const
}
export const ChangeTaskStatusAC = (taskId: string, toDoId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskId, toDoId, isDone
        }
    } as const
}
export const FilterTaskAC = (filter: FilterValue, toDoId: string) => {
    return {
        type: 'FILTER-TASK',
        payload: {
            filter, toDoId
        }
    } as const
}
export const CreateEmptyTaskAC = (newTdId: string)=> {
    return {
        type: 'EMPTY-TASK',
        payload: {
            newTdId
        }
    } as const
}
export const DeleteWithToDoAC = (toDoId: string) => {
    return {
        type: 'DELETE-WITH-TODO',
        payload: {
            toDoId
        }
    } as const
}
export type DeleteWithToDoAC = ReturnType<typeof DeleteWithToDoAC>
export type CreateEmptyTaskAC = ReturnType<typeof CreateEmptyTaskAC>
export type FilterTaskAC = ReturnType<typeof FilterTaskAC>
export type ChangeTaskStatusAC = ReturnType<typeof ChangeTaskStatusAC>
export type ChangeTaskTitleAC = ReturnType<typeof ChangeTaskTitleAC>
export type AddTaskAC = ReturnType<typeof AddTaskAC>
export type RemoveTaskAC = ReturnType<typeof RemoveTaskAC>


type Actions = DeleteWithToDoAC | CreateEmptyTaskAC |
    FilterTaskAC |
    ChangeTaskStatusAC |
    ChangeTaskTitleAC |
    AddTaskAC |
    RemoveTaskAC