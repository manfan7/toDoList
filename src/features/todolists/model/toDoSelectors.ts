import { RootState } from "@/app/store.ts"
import { type toDotype } from "@/App.tsx"

export const selectToDoList = (state: RootState): toDotype[] => state.todoLists.todo
