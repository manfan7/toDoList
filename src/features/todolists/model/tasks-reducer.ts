
import {createAppSlice} from "@/common/utils"
import {type tasksListType,} from "@/common/types"

const initialState = {} as tasksListType
export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState,
  reducers: (_create) => ({


  }),

  selectors: {
    selectTasks: (state) => state,
  },
})

export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors
