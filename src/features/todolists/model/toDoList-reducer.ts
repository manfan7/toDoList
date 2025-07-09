import { FilterValue } from "@/App.tsx"
import {
  createTodolistResponseSchema,
  defaultResponseSchema,
  type DomainToDo,
  type RequestStatus,
} from "@/common/types"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
import { createAppSlice } from "@/common/utils"
import { changeLoading } from "@/app/app-slice.ts"
import { ResultCode } from "@/common/enum/enum.ts"
import { handleServerError } from "@/common/utils/handleServerErrors.ts"
import { handleAppError } from "@/common/utils/handleAppErrors.ts"
import { todolistSchema } from "@/common/types/lib/zodtypes/todolistapitypes.ts"

export const toDoListSlice = createAppSlice({
  name: "todoLists",
  initialState: {
    todo: [] as DomainToDo[],
  },
  reducers: (create) => {
    return {
      changeFilterAC: create.reducer<{ filter: FilterValue; id: string }>((state, action) => {
        const index = state.todo.findIndex((i) => i.id === action.payload.id)
        if (index !== -1) state.todo[index].filter = action.payload.filter
      }),
      changeEntityStatus: create.reducer<{ status: RequestStatus; id: string }>((state, action) => {
        const index = state.todo.findIndex((i) => i.id === action.payload.id)
        if (index !== -1) state.todo[index].entityStatus = action.payload.status
      }),
      reorderToDo: create.asyncThunk(
        async (
          args: { draggedId: string | undefined; targetId: string | undefined; reordered: DomainToDo[] | undefined },
          thunkAPI,
        ) => {
          try {
            if (args.targetId && args.draggedId) {
              const res = await todolistsApi.reorderToDoList(args.targetId, args.draggedId)
              if (res.data.resultCode === ResultCode.Success) {
                return args
              }
            }
          } catch (err) {
            handleServerError(thunkAPI.dispatch, err)
            return thunkAPI.rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            if (action) {
              state.todo = action.payload?.reordered ?? state.todo
            }
          },
        },
      ),
      fetchTodolistsTC: create.asyncThunk(
        async (_, { dispatch, rejectWithValue }) => {
          try {
            dispatch(changeLoading({ status: "loading" }))
            const res = await todolistsApi.getToDoList()
            todolistSchema.array().parse(res.data)
            return { toDo: res.data }
          } catch (err: any) {
            handleServerError(dispatch, err)
            return rejectWithValue(null)
          } finally {
            dispatch(changeLoading({ status: "idle" }))
          }
        },
        {
          fulfilled: (state, action) => {
            state.todo = action.payload?.toDo.map((item) => ({ ...item, filter: "ALL", entityStatus: "idle" }))
          },
        },
      ),
      addtoDoListTC: create.asyncThunk(
        async (arg: { title: string }, thunkAPI) => {
          try {
            thunkAPI.dispatch(changeLoading({ status: "loading" }))
            const res = await todolistsApi.createToDoList(arg.title)
            createTodolistResponseSchema.parse(res.data)
            if (res.data.resultCode === ResultCode.Success) {
              thunkAPI.dispatch(changeLoading({ status: "succeeded" }))
              return {
                ...res.data.data.item,
                filter: "ALL" as FilterValue,
                entityStatus: "idle" as RequestStatus,
              }
            } else {
              handleAppError(thunkAPI.dispatch, res.data)
            }
          } catch (err: any) {
            handleServerError(thunkAPI.dispatch, err)
            return thunkAPI.rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            if (action.payload) {
              const newItem: DomainToDo = { ...action.payload }
              state.todo.push(newItem)
            }
          },
        },
      ),
      removeToDoListTC: create.asyncThunk(
        async (arg: { id: string }, thunkAPI) => {
          try {
            thunkAPI.dispatch(changeEntityStatus({ status: "loading", id: arg.id }))
            const res = await todolistsApi.deleteToDoList(arg.id)
            defaultResponseSchema.parse(res.data)
            return { arg: arg }
          } catch (err) {
            handleServerError(thunkAPI.dispatch, err)
            return thunkAPI.rejectWithValue(null)
          } finally {
            thunkAPI.dispatch(changeEntityStatus({ status: "idle", id: arg.id }))
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state.todo.findIndex((todo) => todo.id === action.payload.arg.id)
            if (index !== -1) {
              state.todo.splice(index, 1)
            }
          },
        },
      ),
      changeTitleTS: create.asyncThunk(
        async (arg: { id: string; title: string }, thunkAPI) => {
          try {
            const res = await todolistsApi.updateToDoList(arg.id, arg.title)
            defaultResponseSchema.parse(res.data)
            return arg
          } catch (err) {
            handleServerError(thunkAPI.dispatch, err)
            return thunkAPI.rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state.todo.findIndex((todo) => todo.id === action.payload.id)
            if (index !== -1) {
              state.todo[index].title = action.payload.title
            }
          },
        },
      ),
    }
  },

  selectors: {
    selectToDoList: (state) => state.todo,
  },
})

export const toDoListReducer = toDoListSlice.reducer
export const {
  changeFilterAC,
  fetchTodolistsTC,
  addtoDoListTC,
  changeTitleTS,
  removeToDoListTC,
  changeEntityStatus,
  reorderToDo,
} = toDoListSlice.actions
export const { selectToDoList } = toDoListSlice.selectors
