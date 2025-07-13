import { addtoDoListTC, clearData, removeToDoListTC } from "./toDoList-reducer.ts"
import { createAppSlice } from "@/common/utils"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import {
  defaultResponseSchema,
  getTasksSchema,
  taskOperationResponseSchema,
  type tasksListType,
  type UpdateTaskModel,
} from "@/common/types"
import { ResultCode } from "@/common/enum/enum.ts"
import { changeLoading } from "@/app/app-slice.ts"
import { handleServerError } from "@/common/utils/handleServerErrors.ts"
import { handleAppError } from "@/common/utils/handleAppErrors.ts"
const initialState = {} as tasksListType
export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState,
  reducers: (create) => ({
    fetchTask: create.asyncThunk(
      async (arg: { todolistId: string }, { dispatch, rejectWithValue }) => {
        try {
          const res = await tasksApi.getTasks(arg.todolistId)
          getTasksSchema.parse(res.data)

          return {
            todolistId: arg.todolistId,
            tasks: res.data.items,
          }
        } catch (err: any) {
          handleServerError(dispatch, err)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks
        },
      },
    ),
    updateTask: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string; model: Partial<UpdateTaskModel> }, thunkAPI) => {
        try {
          const { todolistId, taskId, model } = payload

          const res = await tasksApi.updateTask(todolistId, taskId, model)
          taskOperationResponseSchema.parse(res.data)

          return { task: res.data.data.item }
        } catch (err) {
          handleServerError(thunkAPI.dispatch, err)
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const task = state[action.payload.task.todoListId].find((item) => item.id === action.payload.task.id)
          if (task) {
            task.status = action.payload.task.status
            task.title = action.payload.task.title
          }
        },
      },
    ),
    removeTask: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string }, { dispatch, rejectWithValue }) => {
        try {
          const res = await tasksApi.deleteTask(payload.todolistId, payload.taskId)
          defaultResponseSchema.parse(res.data)
          if (res.data.resultCode === 0) {
            return {
              todolistId: payload.todolistId,
              taskId: payload.taskId,
            }
          } else {
            handleAppError(dispatch, res.data)
          }
        } catch (err) {
          handleServerError(dispatch, err)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          if (action.payload) {
            const index = state[action.payload.todolistId].findIndex((item) => item.id === action.payload?.taskId)
            if (index !== -1) {
              state[action.payload.todolistId].splice(index, 1)
            }
          }
        },
      },
    ),
    addTask: create.asyncThunk(
      async (arg: { todolistId: string; title: string }, { dispatch, rejectWithValue }) => {
        dispatch(changeLoading({ status: "loading" }))
        try {
          const res = await tasksApi.createTasks(arg.todolistId, arg.title)
          taskOperationResponseSchema.parse(res.data)
          if (res.data.resultCode === ResultCode.Success) {
            return {
              tasks: res.data.data.item,
            }
          } else {
            handleAppError(dispatch, res.data)
          }
        } catch (err: any) {
          handleServerError(dispatch, err)
          return rejectWithValue(null)
        } finally {
          dispatch(changeLoading({ status: "idle" }))
        }
      },
      {
        fulfilled: (state, action) => {
          if (action.payload) {
            state[action.payload.tasks.todoListId].push(action.payload.tasks)
          }
        },
      },
    ),
  }),
  extraReducers: (builder) => {
    builder.addCase(addtoDoListTC.fulfilled, (state, action) => {
      if (action.payload) {
        state[action.payload.id] = []
      }
    })
    builder.addCase(removeToDoListTC.fulfilled, (state, action) => {
      delete state[action.payload.arg.id]
    })
    builder.addCase(clearData, (_state, _action) => {
      return initialState
    })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const tasksReducer = tasksSlice.reducer
export const { fetchTask, addTask, removeTask, updateTask } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
