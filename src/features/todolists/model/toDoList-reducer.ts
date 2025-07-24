import {type DomainToDo} from "@/common/types"
import {createAppSlice} from "@/common/utils"

const initialState = {
    todo: [] as DomainToDo[],
}
export const toDoListSlice = createAppSlice({
    name: "todoLists",
    initialState,
    reducers: (_create) => {
        return {






        }
    },

    selectors: {
        selectToDoList: (state) => state.todo,
    },
})

export const toDoListReducer = toDoListSlice.reducer
export const {






} = toDoListSlice.actions
export const {selectToDoList} = toDoListSlice.selectors
