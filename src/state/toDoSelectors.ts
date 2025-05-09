import {RootState} from "../app/store.ts";
import {toDoStateType} from "../App.tsx";

export const selectToDoList = (state:RootState):toDoStateType=>state.todolists
