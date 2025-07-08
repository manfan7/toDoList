import List from "@mui/material/List"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"

import { filterTask } from "@/features/todolists/ui/ToDoLists/Todolists.tsx"
import { FilterValue } from "@/App.tsx"
import { TaskItem } from "@/features/todolists/ui/TodolistItem/Tasks/TaskItem/TaskItem.tsx"
import { fetchTask, selectTasks } from "@/features/todolists/model/tasks-reducer.ts"
import { useEffect } from "react"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import type { DomainTask, RequestStatus } from "@/common/types"

type Tasks = {
  filter: FilterValue
  id: string
  entityStatus: RequestStatus
}
export const Tasks = ({ filter, id, entityStatus }: Tasks) => {
  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTask({ todolistId: id }))
  }, [])
  let tasksForToDoList = filterTask(tasks, filter, id)

  return (
    <>
      {tasksForToDoList?.length === 0 ? (
        <>Тасок нет</>
      ) : (
        <List
          sx={{
            flex: "3",
          }}
        >
          {tasksForToDoList?.map((task: DomainTask) => {
            return <TaskItem key={task.id} task={task} id={id} entityStatus={entityStatus} />
          })}
        </List>
      )}
    </>
  )
}
