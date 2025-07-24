import {type DomainToDo, type RequestStatus,} from "@/common/types"
import {createAppSlice} from "@/common/utils"

const initialState = {
    todo: [] as DomainToDo[],
}
export const toDoListSlice = createAppSlice({
    name: "todoLists",
    initialState,
    reducers: (create) => {
        return {

            changeEntityStatus: create.reducer<{ status: RequestStatus; id: string }>((state, action) => {
                const index = state.todo.findIndex((i) => i.id === action.payload.id)
                if (index !== -1) state.todo[index].entityStatus = action.payload.status
            }),





        }
    },

    selectors: {
        selectToDoList: (state) => state.todo,
    },
})

export const toDoListReducer = toDoListSlice.reducer
export const {



    changeEntityStatus,


} = toDoListSlice.actions
export const {selectToDoList} = toDoListSlice.selectors
