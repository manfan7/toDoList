import List from "@mui/material/List"

import {filterTask} from "@/features/todolists/ui/ToDoLists/Todolists.tsx"
import {FilterValue} from "@/App.tsx"
import {TaskItem} from "@/features/todolists/ui/TodolistItem/Tasks/TaskItem/TaskItem.tsx"
import type {DomainTask, RequestStatus} from "@/common/types"
import {useGetTasksQuery} from "@/features/todolists/api/tasksApi.ts";

type Tasks = {
  filter: FilterValue
  id: string
  entityStatus: RequestStatus
}
export const Tasks = ({ filter, id, entityStatus }: Tasks) => {

  const {data} = useGetTasksQuery(id)

  let tasksForToDoList = filterTask(data?.items, filter)


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
