import {addtoDoListTC, clearData, removeToDoListTC} from "./toDoList-reducer.ts"
import {createAppSlice} from "@/common/utils"
import {type tasksListType,} from "@/common/types"

const initialState = {} as tasksListType
export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState,
  reducers: (_create) => ({


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
export const { selectTasks } = tasksSlice.selectors
