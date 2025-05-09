import {RootState} from "../app/store.ts";
import {tasksListType} from "../App.tsx";

export const selectTasks = (state:RootState):tasksListType=>state.tasks
